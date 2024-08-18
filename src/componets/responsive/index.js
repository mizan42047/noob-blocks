import { DropdownMenu } from '@wordpress/components';
import { desktop, tablet, mobile } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useSelect, dispatch } from '@wordpress/data';
const Responsive = (props) => {
    const { device } = useSelect((select) => {
        const { getDeviceType } = select('core/editor');
        return {
            device: getDeviceType(),
        }
    }, []);

    const { setDeviceType } = dispatch('core/editor');

    let deviceIcon = desktop;
    if (device === 'Tablet') {
        deviceIcon = tablet
    } else if (device === 'Mobile') {
        deviceIcon = mobile
    }

    return (
        <div className="noob-blocks-responsive">
            <DropdownMenu
                icon={deviceIcon}
                controls={[
                    {
                        icon: desktop,
                        onClick: () => setDeviceType('Desktop'),
                    },
                    {
                        icon: tablet,
                        onClick: () => setDeviceType('Tablet'),
                    },
                    {
                        icon: mobile,
                        onClick: () => setDeviceType('Mobile'),
                    },
                ]}
            >
            </DropdownMenu>
            {props.children}
        </div>
    )
}

export default Responsive;