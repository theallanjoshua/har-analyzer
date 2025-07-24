import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Modal from '@cloudscape-design/components/modal';
import { useState } from 'react';
import VerticalGap from '~/components/vertical-gap';
import ContentWidthSwitcher from './content-width-switcher';
import ThemeSwitcher from './theme-switcher';

export default function SimpleAppPreferences() {
	const [isVisible, setVisible] = useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	return (
		<>
			<Button iconName="settings" variant="icon" onClick={showModal} />
			<Modal
				visible={isVisible}
				onDismiss={hideModal}
				header="Manage your preferences"
				footer={
					<Box float="right">
						<Button variant="primary" onClick={hideModal}>
							Ok
						</Button>
					</Box>
				}
			>
				<Box margin={{ top: 'm' }} />
				<VerticalGap size="m">
					<ThemeSwitcher />
					<ContentWidthSwitcher />
				</VerticalGap>
			</Modal>
		</>
	);
}
