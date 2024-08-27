import { memo } from '@wordpress/element';
import {
    TabPanel,
    SelectControl,
    PanelBody,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    ColorPalette,
    Button,
    Dropdown,
    Flex,
    FlexItem,
    FontSizePicker
} from '@wordpress/components';
import clsx from 'clsx';

import { alignLeft, alignRight, alignCenter, edit } from '@wordpress/icons';
import Responsive from '../../componets/responsive';
import Advanced from './advanced';
import { InspectorControls, __experimentalFontFamilyControl as FontFamilyControl } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const Settings = ({ attributes, setAttributes, clientId }) => {
    const { device } = useSelect((select) => {
        const { getDeviceType } = select('core/editor');
        return {
            device: getDeviceType(),
        }
    }, []);


    const { fontFamilies } = useSelect((select) => {
        const { theme, custom = [] } = select('core/block-editor').getSettings()?.__experimentalFeatures?.typography?.fontFamilies || {};
        return {
            fontFamilies: [...theme, ...custom]
        }
    }, []);

    const colors = [
        { name: 'red', color: '#f00' },
        { name: 'white', color: '#fff' },
        { name: 'blue', color: '#00f' },
    ];

    const fontSizes = [
        {
            name: __('Small'),
            slug: 'small',
            size: 12,
        },
        {
            name: __('Big'),
            slug: 'big',
            size: 26,
        },
    ];
    return (
        <InspectorControls>
            <TabPanel
                tabs={[
                    {
                        name: 'content',
                        title: __('Content', 'noob-blocks'),
                    },
                    {
                        name: 'style',
                        title: __('Style', 'noob-blocks'),
                    },
                    {
                        name: 'advanced',
                        title: __('Advanced', 'noob-blocks'),
                    }
                ]}
            >
                {
                    ({ name }) => {
                        switch (name) {
                            case 'content':
                                return (
                                    <>
                                        <PanelBody title={__('Content', 'noob-blocks')}>
                                            <SelectControl
                                                label={__('HTML Tag', 'noob-blocks')}
                                                value={attributes?.htmlTag}
                                                onChange={(value) => setAttributes({ htmlTag: value })}
                                                options={[
                                                    { label: 'h1', value: 'h1' },
                                                    { label: 'h2', value: 'h2' },
                                                    { label: 'h3', value: 'h3' },
                                                    { label: 'h4', value: 'h4' },
                                                    { label: 'h5', value: 'h5' },
                                                    { label: 'h6', value: 'h6' },
                                                ]}
                                            />
                                        </PanelBody>
                                    </>
                                )
                            case 'style':
                                return (
                                    <>
                                        <PanelBody title={__('Heading', 'noob-blocks')}>
                                            <Responsive>
                                                <ToggleGroupControl
                                                    label={__('Alignment', 'noob-blocks')}
                                                    value={attributes[`alignment${device}`]}
                                                    isBlock
                                                    __nextHasNoMarginBottom
                                                    isDeselectable
                                                    className="noob-blocks-tooggle-group"
                                                    onChange={(value) => {
                                                        setAttributes({ [`alignment${device}`]: value });
                                                    }}
                                                >
                                                    <ToggleGroupControlOption value='left' label={alignLeft} aria-label={__('Left', 'noob-blocks')} />
                                                    <ToggleGroupControlOption value="center" label={alignCenter} aria-label={__('Center', 'noob-blocks')} />
                                                    <ToggleGroupControlOption value="right" label={alignRight} aria-label={__('Right', 'noob-blocks')} />
                                                </ToggleGroupControl>
                                            </Responsive>
                                            <ColorPalette
                                                __experimentalIsRenderedInSidebar
                                                asButtons={true}
                                                colors={colors}
                                                value={attributes?.textColor}
                                                onChange={(textColor) => setAttributes({ textColor })}
                                            />
                                            <Dropdown
                                                className="noob-blocks-dropdown"
                                                contentClassName="noob-blocks-dropdown-content"
                                                popoverProps={{ placement: 'left-start' }}
                                                __experimentalIsRenderedInSidebar
                                                renderToggle={({ isOpen, onToggle }) => (
                                                    <Flex>
                                                        <FlexItem>
                                                            <Button
                                                                onClick={onToggle}
                                                                icon={edit}
                                                                label={__('Typography', 'noob-blocks')}
                                                                aria-expanded={isOpen}
                                                                aria-label={__('Typography', 'noob-blocks')}
                                                                className={clsx('noob-blocks-dropdown-toggle', { 'is-open': isOpen })}
                                                            />
                                                        </FlexItem>
                                                        <FlexItem>
                                                            <h3>{__('Typography', 'noob-blocks')}</h3>
                                                        </FlexItem>
                                                    </Flex>
                                                )}
                                                renderContent={() => {
                                                    return (
                                                        <div className="noob-blocks-typography">
                                                            <FontFamilyControl
                                                                label={__('Font Family', 'noob-blocks')}
                                                                value={attributes?.typography?.fontFamily}
                                                                onChange={(newFontFamily) => {
                                                                    setAttributes({ typography: { ...attributes?.typography, fontFamily: newFontFamily } });
                                                                }}
                                                                fontFamilies={fontFamilies}
                                                            />
                                                            <FontSizePicker
                                                                fontSizes={fontSizes}
                                                                value={attributes?.typography?.fontSize}
                                                                fallbackFontSize={12}
                                                                onChange={(newFontSize) => {
                                                                    setAttributes({ typography: { ...attributes?.typography, fontSize: newFontSize } });
                                                                }}
                                                                units={['px', 'em', 'rem']}
                                                                withSlider={true}
                                                            />
                                                        </div>
                                                    )
                                                }}
                                            />
                                        </PanelBody>
                                    </>
                                )
                            case 'advanced':
                                return (
                                    <Advanced attributes={attributes} setAttributes={setAttributes} clientId={clientId}></Advanced>
                                )
                        }
                    }
                }
            </TabPanel>
        </InspectorControls>
    )
}
export default memo(Settings);