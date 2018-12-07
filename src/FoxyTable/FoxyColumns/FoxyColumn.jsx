import React, {Component} from 'react';
import PropTypes from "prop-types";

const propTypes = {
    hidden: PropTypes.bool,
    id: PropTypes.string.isRequired,
    colTitle: PropTypes.string.isRequired,
    canSort: PropTypes.bool
};

export default class FoxyColumn extends Component {
    render() {
        return ;
    }
}
FoxyColumn.propTypes = propTypes;
