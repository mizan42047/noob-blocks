
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __experimentalBoxControl as BoxControl, PanelBody } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import style from './style';
import "./style.scss";
import cslx from 'clsx';

const AdvancedControl = createHigherOrderComponent((Advanced) => {
    return (props) => {
        const { attributes, setAttributes, clientId } = props
        const oldAttributes = useRef(attributes);
        useEffect(() => {
            const moduleStyle = style(attributes);
            if (JSON.stringify(attributes) !== JSON.stringify(oldAttributes.current)) {
                setAttributes({ moduleStyle });
                oldAttributes.current = attributes;
            }
        }, [JSON.stringify(attributes), clientId]);
        

        return (
            <Advanced {...props}>
                {props.children}
                <PanelBody title={__('Layout', 'noob-blocks')}>
                    <BoxControl
                        label={__('Padding', 'noob-blocks')}
                        values={attributes?.advancedPadding}
                        onChange={(value) => setAttributes({ advancedPadding: value })}
                    />
                </PanelBody>
            </Advanced>
        )
    }
}, "AdvancedControl")
addFilter('noob-blocks.advanced-control', 'noob-blocks/advanced-control', AdvancedControl);

const addSettings = (settings, name) => {
    if (name.startsWith('noob-blocks/')) {
        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                advancedPadding: {
                    type: 'object'
                },
                moduleStyle: {
                    type: 'string'
                }
            }
        }
    }

    return settings;
}
addFilter('blocks.registerBlockType', 'noob-blocks/addSettings', addSettings);

const ModuleEdit = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, clientId, name } = props
        if (name.startsWith('noob-blocks/')) {
            return (
                <>
                    <style>{attributes?.moduleStyle}</style>
                    <BlockEdit {...props} />
                </>
            )
        }
        return <BlockEdit {...props} />
    }
}, "ModuleEdit")
addFilter('editor.BlockEdit', 'noob-blocks/edit', ModuleEdit)

const BlockWrapper = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const { name } = props
        if (name.startsWith('noob-blocks/')) {
            let blockProps = {
                ...props,
                className: cslx(props.className, 'noob-blocks')
            }
            return (
                <>
                    <BlockListBlock {...blockProps} />
                </>
            )
        }
        return <BlockListBlock {...props} />
    }
}, "BlockWrapper");

addFilter('editor.BlockListBlock', 'noob-blocks/block-wrapper', BlockWrapper);