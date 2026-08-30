import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button.jsx';

export const FloatingAppointmentButton = () => {
	const navigate = useNavigate();

	return (
		<div className="fixed bottom-6 left-5 z-40 md:hidden">
			<LiquidMetalButton
				label="Book Appointment"
				viewMode="icon"
				icon={<CalendarCheck size={18} style={{ color: '#e8e8e8', filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))' }} />}
				onClick={() => navigate('/appointment')}
			/>
		</div>
	);
};

export default FloatingAppointmentButton;
