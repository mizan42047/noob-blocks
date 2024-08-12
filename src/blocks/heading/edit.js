import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, __experimentalFontFamilyControl as FontFamilyControl } from '@wordpress/block-editor';
import './editor.scss';
import classNames from 'classnames';
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
import { alignLeft, alignRight, alignCenter, edit } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import style from './style';

export default function Edit({ attributes, setAttributes, clientId }) {
	const blockProps = useBlockProps({
		className: classNames('noob-blocks-heading', attributes?.blockClass),
	});

	const { fontFamilies } = useSelect((select) => {
		const { theme, custom } = select('core/block-editor').getSettings()?.__experimentalFeatures?.typography?.fontFamilies || {};
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
			name: __( 'Small' ),
			slug: 'small',
			size: 12,
		},
		{
			name: __( 'Big' ),
			slug: 'big',
			size: 26,
		},
	];

	const oldAttributes = useRef(attributes);

	useEffect(() => {
		const hash = clientId?.slice(-6); 
		if(!attributes?.blockClass){
			setAttributes({ blockClass: `noob${hash}` });
		}
		
		if(attributes?.blockClass && JSON.stringify(attributes) !== JSON.stringify(oldAttributes.current)){
			setAttributes({ blockClass: `noob${hash}` });
			oldAttributes.current = attributes;
		}
	}, [clientId, JSON.stringify(attributes)]);


	useEffect(() => {
		const blockStyle = style(attributes);
		setAttributes({ blockStyle });
	}, [JSON.stringify(attributes), clientId]);
	

	return (
		<>
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
												<ToggleGroupControl
													label={__('Alignment', 'noob-blocks')}
													value={attributes?.alignment}
													isBlock
													__nextHasNoMarginBottom
													isDeselectable
													className="noob-blocks-tooggle-group"
													onChange={(value) => setAttributes({ alignment: value })}
												>
													<ToggleGroupControlOption value='left' label={alignLeft} aria-label={__('Left', 'noob-blocks')} />
													<ToggleGroupControlOption value="center" label={alignCenter} aria-label={__('Center', 'noob-blocks')} />
													<ToggleGroupControlOption value="right" label={alignRight} aria-label={__('Right', 'noob-blocks')} />
												</ToggleGroupControl>
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
																	className={classNames('noob-blocks-dropdown-toggle', { 'is-open': isOpen })}
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
																	units={[ 'px', 'em', 'rem' ]}
																	withSlider={true}
																/>
															</div>
														)
													}}
												/>
											</PanelBody>
										</>
									)
							}
						}
					}
				</TabPanel>
			</InspectorControls>
			<style>{attributes?.blockStyle}</style>
			<div {...blockProps}>
				<RichText
					tagName={attributes?.htmlTag}
					identifier="content"
					value={attributes?.content}
					onChange={(content) => setAttributes({ content })}
					placeholder={__('Heading...', 'noob-blocks')}
					className="noob-blocks-heading-text"
				/>
			</div>
		</>
	);
}

