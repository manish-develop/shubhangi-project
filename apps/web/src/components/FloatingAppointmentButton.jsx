import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button.jsx';

export const FloatingAppointmentButton = () => {
	const navigate = useNavigate();

	return (
		<div className="fixed bottom-6 left-5 z-40 flex leading-none md:hidden">
			<LiquidMetalButton
				label="Book Your Appointment"
				viewMode="text"
				width={240}
				height={56}
				tintColor="hsl(170 60% 22%)"
				tintColorDark="hsl(170 74% 10%)"
				textColor="#ffffff"
				shaderFilter="hue-rotate(140deg) saturate(1.5) brightness(0.95)"
				icon={<CalendarCheck size={18} style={{ color: '#ffffff', filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))' }} />}
				onClick={() => navigate('/appointment')}
			/>
		</div>
	);
};

export default FloatingAppointmentButton;
