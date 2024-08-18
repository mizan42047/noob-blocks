import { withFilters } from '@wordpress/components';
const Advanced = (props) => {
    return props.children;
}

export default withFilters('noob-blocks.advanced-control')(Advanced);