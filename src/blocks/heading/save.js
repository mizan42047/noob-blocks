import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';
import classNames from 'classnames';
export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: classNames('noob-blocks-heading', attributes?.blockClass),
	});
	return (
		<>
			<style>{attributes?.blockStyle}</style>
			<div {...blockProps}>
				<RichText.Content
					tagName={attributes?.htmlTag}
					identifier="content"
					value={attributes?.content}
					className="noob-blocks-heading-text"
				/>
			</div>
		</>
	);
}
