import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';
import clsx from 'clsx';
import { useEffect, useRef, Suspense, lazy } from '@wordpress/element';
import style from './style';

const Settings = lazy(() => import('./settings.js'));
export default function Edit({ attributes, setAttributes, clientId, isSelected }) {
	const blockProps = useBlockProps({
		className: clsx('noob-blocks-heading', attributes?.blockClass),
	});

	const oldAttributes = useRef(attributes);

	useEffect(() => {
		const hash = clientId?.slice(-6);
		if (!attributes?.blockClass) {
			setAttributes({ blockClass: `noob${hash}` });
		}

		if (attributes?.blockClass && JSON.stringify(attributes) !== JSON.stringify(oldAttributes.current)) {
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
			{isSelected && (
				<Suspense fallback={<span>Loading...</span>}>
					<Settings attributes={attributes} setAttributes={setAttributes} clientId={clientId} />
				</Suspense>
			)}
			<style>{attributes?.blockStyle}</style>
			<div className="reusabe-container">
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
			</div>
		</>
	);
}

