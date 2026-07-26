import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Grid3x3, List, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminApi } from '../lib/adminApi';

const categories = ['Consultation', 'Follow-up', 'Personal', 'Other'];
const colors = [
	{ name: 'Green', value: 'green', bg: 'bg-primary', text: 'text-primary' },
	{ name: 'Blue', value: 'blue', bg: 'bg-blue-500', text: 'text-blue-700' },
	{ name: 'Purple', value: 'purple', bg: 'bg-purple-500', text: 'text-purple-700' },
	{ name: 'Orange', value: 'orange', bg: 'bg-orange-500', text: 'text-orange-700' },
	{ name: 'Pink', value: 'pink', bg: 'bg-pink-500', text: 'text-pink-700' },
	{ name: 'Red', value: 'red', bg: 'bg-red-500', text: 'text-red-700' },
];

const getColorClasses = (colorValue) => colors.find((c) => c.value === colorValue) || colors[0];

const toLocalInputValue = (date) => {
	if (!date) return '';
	const d = new Date(date);
	return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const emptyDraft = { title: '', description: '', color: colors[0].value, category: categories[0], start_time: '', end_time: '' };

export default function EventManagerPage() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [view, setView] = useState('month');
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [draft, setDraft] = useState(emptyDraft);
	const [searchQuery, setSearchQuery] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const load = () => {
		setLoading(true);
		adminApi
			.get('/admin/events')
			.then(setEvents)
			.catch((err) => toast.error(err.message))
			.finally(() => setLoading(false));
	};

	useEffect(load, []);

	const filteredEvents = useMemo(() => {
		if (!searchQuery) return events;
		const q = searchQuery.toLowerCase();
		return events.filter(
			(e) =>
				e.title.toLowerCase().includes(q) ||
				e.description?.toLowerCase().includes(q) ||
				e.category?.toLowerCase().includes(q)
		);
	}, [events, searchQuery]);

	const openCreateDialog = (prefillDate) => {
		setIsCreating(true);
		setDraft({
			...emptyDraft,
			start_time: prefillDate ? toLocalInputValue(prefillDate) : toLocalInputValue(new Date()),
			end_time: prefillDate ? toLocalInputValue(new Date(prefillDate.getTime() + 30 * 60000)) : toLocalInputValue(new Date(Date.now() + 30 * 60000)),
		});
		setIsDialogOpen(true);
	};

	const openEditDialog = (event) => {
		setIsCreating(false);
		setSelectedEvent(event);
		setDraft({
			title: event.title,
			description: event.description || '',
			color: event.color || colors[0].value,
			category: event.category || categories[0],
			start_time: toLocalInputValue(event.start_time),
			end_time: toLocalInputValue(event.end_time),
		});
		setIsDialogOpen(true);
	};

	const handleSave = async () => {
		if (!draft.title || !draft.start_time || !draft.end_time) {
			toast.error('Title, start and end time are required');
			return;
		}
		setSubmitting(true);
		try {
			const payload = {
				title: draft.title,
				description: draft.description,
				color: draft.color,
				category: draft.category,
				start_time: new Date(draft.start_time).toISOString(),
				end_time: new Date(draft.end_time).toISOString(),
			};
			if (isCreating) {
				await adminApi.post('/admin/events', payload);
				toast.success('Event scheduled');
			} else {
				await adminApi.put(`/admin/events/${selectedEvent.id}`, payload);
				toast.success('Event updated');
			}
			setIsDialogOpen(false);
			load();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async () => {
		if (!selectedEvent) return;
		if (!window.confirm(`Delete "${selectedEvent.title}"?`)) return;
		try {
			await adminApi.del(`/admin/events/${selectedEvent.id}`);
			toast.success('Event deleted');
			setIsDialogOpen(false);
			setSelectedEvent(null);
			load();
		} catch (err) {
			toast.error(err.message);
		}
	};

	const navigateDate = useCallback(
		(direction) => {
			setCurrentDate((prev) => {
				const d = new Date(prev);
				if (view === 'month') d.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
				else if (view === 'week') d.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
				else if (view === 'day') d.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
				return d;
			});
		},
		[view]
	);

	const headerLabel =
		view === 'month'
			? currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
			: view === 'week'
				? `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
				: view === 'day'
					? currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
					: 'All Events';

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h1 className="text-2xl font-bold text-foreground">Schedule</h1>
				<p className="text-muted-foreground">Manage appointments, follow-ups, and personal events</p>
			</div>

			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
					<h2 className="text-xl font-semibold">{headerLabel}</h2>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="icon" onClick={() => navigateDate('prev')} className="h-8 w-8">
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
							Today
						</Button>
						<Button variant="outline" size="icon" onClick={() => navigateDate('next')} className="h-8 w-8">
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
					<div className="flex items-center gap-1 rounded-lg border bg-background p-1">
						<Button variant={view === 'month' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('month')} className="h-8">
							<Calendar className="h-4 w-4" /> <span className="ml-1">Month</span>
						</Button>
						<Button variant={view === 'week' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('week')} className="h-8">
							<Grid3x3 className="h-4 w-4" /> <span className="ml-1">Week</span>
						</Button>
						<Button variant={view === 'day' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('day')} className="h-8">
							<Clock className="h-4 w-4" /> <span className="ml-1">Day</span>
						</Button>
						<Button variant={view === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('list')} className="h-8">
							<List className="h-4 w-4" /> <span className="ml-1">List</span>
						</Button>
					</div>
					<Button onClick={() => openCreateDialog(null)} className="w-full sm:w-auto">
						<Plus className="mr-2 h-4 w-4" /> New Event
					</Button>
				</div>
			</div>

			<div className="relative">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
				{searchQuery && (
					<Button variant="ghost" size="icon" className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2" onClick={() => setSearchQuery('')}>
						<X className="h-4 w-4" />
					</Button>
				)}
			</div>

			{loading && <p className="text-muted-foreground">Loading schedule...</p>}

			{!loading && view === 'month' && (
				<MonthView currentDate={currentDate} events={filteredEvents} onEventClick={openEditDialog} onDayClick={openCreateDialog} />
			)}
			{!loading && view === 'week' && (
				<WeekView currentDate={currentDate} events={filteredEvents} onEventClick={openEditDialog} onSlotClick={openCreateDialog} />
			)}
			{!loading && view === 'day' && (
				<DayView currentDate={currentDate} events={filteredEvents} onEventClick={openEditDialog} onSlotClick={openCreateDialog} />
			)}
			{!loading && view === 'list' && <ListView events={filteredEvents} onEventClick={openEditDialog} />}

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{isCreating ? 'New Event' : 'Edit Event'}</DialogTitle>
						<DialogDescription>{isCreating ? 'Schedule a new appointment or event' : 'Update this event'}</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<div className="space-y-2">
							<Label>Title</Label>
							<Input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} placeholder="Event title" />
						</div>

						<div className="space-y-2">
							<Label>Description</Label>
							<Textarea rows={3} value={draft.description} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))} placeholder="Details (optional)" />
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Start Time</Label>
								<Input type="datetime-local" value={draft.start_time} onChange={(e) => setDraft((d) => ({ ...d, start_time: e.target.value }))} />
							</div>
							<div className="space-y-2">
								<Label>End Time</Label>
								<Input type="datetime-local" value={draft.end_time} onChange={(e) => setDraft((d) => ({ ...d, end_time: e.target.value }))} />
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Category</Label>
								<Select value={draft.category} onValueChange={(v) => setDraft((d) => ({ ...d, category: v }))}>
									<SelectTrigger><SelectValue /></SelectTrigger>
									<SelectContent>
										{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Color</Label>
								<Select value={draft.color} onValueChange={(v) => setDraft((d) => ({ ...d, color: v }))}>
									<SelectTrigger><SelectValue /></SelectTrigger>
									<SelectContent>
										{colors.map((c) => (
											<SelectItem key={c.value} value={c.value}>
												<div className="flex items-center gap-2">
													<div className={cn('h-3 w-3 rounded', c.bg)} /> {c.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<DialogFooter>
						{!isCreating && (
							<Button variant="destructive" onClick={handleDelete}>Delete</Button>
						)}
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
						<Button onClick={handleSave} disabled={submitting}>{isCreating ? 'Create' : 'Save'}</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function EventChip({ event, onClick, compact }) {
	const colorClasses = getColorClasses(event.color);
	return (
		<button
			type="button"
			onClick={(e) => { e.stopPropagation(); onClick(event); }}
			className={cn(
				'w-full truncate rounded px-1.5 py-0.5 text-left text-xs font-medium text-white transition-transform hover:scale-[1.02]',
				colorClasses.bg,
				compact ? '' : 'px-2 py-1'
			)}
		>
			{event.title}
		</button>
	);
}

function MonthView({ currentDate, events, onEventClick, onDayClick }) {
	const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	const startDate = new Date(firstDay);
	startDate.setDate(startDate.getDate() - startDate.getDay());

	const days = [];
	const cursor = new Date(startDate);
	for (let i = 0; i < 42; i++) {
		days.push(new Date(cursor));
		cursor.setDate(cursor.getDate() + 1);
	}

	const getEventsForDay = (date) =>
		events.filter((e) => {
			const d = new Date(e.start_time);
			return d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
		});

	return (
		<Card className="overflow-hidden">
			<div className="grid grid-cols-7 border-b">
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
					<div key={d} className="border-r p-2 text-center text-xs font-medium last:border-r-0">{d}</div>
				))}
			</div>
			<div className="grid grid-cols-7">
				{days.map((day, i) => {
					const dayEvents = getEventsForDay(day);
					const isCurrentMonth = day.getMonth() === currentDate.getMonth();
					const isToday = day.toDateString() === new Date().toDateString();
					return (
						<div
							key={i}
							onClick={() => onDayClick(day)}
							className={cn('min-h-24 cursor-pointer border-b border-r p-2 transition-colors last:border-r-0 hover:bg-accent/50', !isCurrentMonth && 'bg-muted/30')}
						>
							<div className={cn('mb-1 flex h-6 w-6 items-center justify-center rounded-full text-sm', isToday && 'bg-primary text-primary-foreground font-semibold')}>
								{day.getDate()}
							</div>
							<div className="space-y-1">
								{dayEvents.slice(0, 3).map((event) => (
									<EventChip key={event.id} event={event} onClick={onEventClick} compact />
								))}
								{dayEvents.length > 3 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>}
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
}

function WeekView({ currentDate, events, onEventClick, onSlotClick }) {
	const startOfWeek = new Date(currentDate);
	startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
	const weekDays = Array.from({ length: 7 }, (_, i) => {
		const d = new Date(startOfWeek);
		d.setDate(startOfWeek.getDate() + i);
		return d;
	});
	const hours = Array.from({ length: 24 }, (_, i) => i);

	const getEventsForDayHour = (date, hour) =>
		events.filter((e) => {
			const d = new Date(e.start_time);
			return d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear() && d.getHours() === hour;
		});

	return (
		<Card className="overflow-auto">
			<div className="grid grid-cols-8 border-b">
				<div className="border-r p-2 text-center text-xs font-medium">Time</div>
				{weekDays.map((d) => (
					<div key={d.toISOString()} className="border-r p-2 text-center text-xs font-medium last:border-r-0">
						<div>{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
						<div className="text-muted-foreground">{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
					</div>
				))}
			</div>
			<div className="grid grid-cols-8">
				{hours.map((hour) => (
					<React.Fragment key={hour}>
						<div className="border-b border-r p-1 text-xs text-muted-foreground">{String(hour).padStart(2, '0')}:00</div>
						{weekDays.map((day) => {
							const slotEvents = getEventsForDayHour(day, hour);
							const slotDate = new Date(day); slotDate.setHours(hour, 0, 0, 0);
							return (
								<div
									key={`${day.toISOString()}-${hour}`}
									onClick={() => onSlotClick(slotDate)}
									className="min-h-12 cursor-pointer border-b border-r p-0.5 transition-colors last:border-r-0 hover:bg-accent/50"
								>
									{slotEvents.map((event) => <EventChip key={event.id} event={event} onClick={onEventClick} />)}
								</div>
							);
						})}
					</React.Fragment>
				))}
			</div>
		</Card>
	);
}

function DayView({ currentDate, events, onEventClick, onSlotClick }) {
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const getEventsForHour = (hour) =>
		events.filter((e) => {
			const d = new Date(e.start_time);
			return d.getDate() === currentDate.getDate() && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear() && d.getHours() === hour;
		});

	return (
		<Card className="overflow-auto">
			{hours.map((hour) => {
				const hourEvents = getEventsForHour(hour);
				const slotDate = new Date(currentDate); slotDate.setHours(hour, 0, 0, 0);
				return (
					<div key={hour} className="flex border-b last:border-b-0">
						<div className="w-16 flex-shrink-0 border-r p-2 text-xs text-muted-foreground">{String(hour).padStart(2, '0')}:00</div>
						<div onClick={() => onSlotClick(slotDate)} className="min-h-16 flex-1 cursor-pointer p-2 transition-colors hover:bg-accent/50">
							<div className="space-y-2">
								{hourEvents.map((event) => (
									<div
										key={event.id}
										onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
										className={cn('cursor-pointer rounded-lg p-2 text-sm text-white', getColorClasses(event.color).bg)}
									>
										<div className="font-semibold">{event.title}</div>
										{event.description && <div className="text-xs opacity-90">{event.description}</div>}
									</div>
								))}
							</div>
						</div>
					</div>
				);
			})}
		</Card>
	);
}

function ListView({ events, onEventClick }) {
	const sorted = [...events].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
	const grouped = sorted.reduce((acc, event) => {
		const key = new Date(event.start_time).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
		(acc[key] ||= []).push(event);
		return acc;
	}, {});

	return (
		<Card className="p-4">
			<div className="space-y-6">
				{Object.entries(grouped).map(([date, dateEvents]) => (
					<div key={date} className="space-y-3">
						<h3 className="text-sm font-semibold text-muted-foreground">{date}</h3>
						<div className="space-y-2">
							{dateEvents.map((event) => (
								<div
									key={event.id}
									onClick={() => onEventClick(event)}
									className="group cursor-pointer rounded-lg border bg-card p-4 transition-all hover:shadow-md"
								>
									<div className="flex items-start gap-3">
										<div className={cn('mt-1 h-3 w-3 rounded-full', getColorClasses(event.color).bg)} />
										<div className="min-w-0 flex-1">
											<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
												<div className="min-w-0">
													<h4 className="truncate font-semibold text-sm group-hover:text-primary transition-colors">{event.title}</h4>
													{event.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{event.description}</p>}
												</div>
												{event.category && <Badge variant="secondary" className="text-xs shrink-0">{event.category}</Badge>}
											</div>
											<div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
												<Clock className="h-3 w-3" />
												{new Date(event.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
				{sorted.length === 0 && <div className="py-12 text-center text-sm text-muted-foreground">No events scheduled</div>}
			</div>
		</Card>
	);
}
