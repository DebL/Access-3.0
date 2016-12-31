var React = require('react'),
    PropTypes = React.PropTypes,
    _ = require('lodash'),
    FaIcon = require('react-fa');

module.exports = React.createClass({

    displayName: 'ColorTable',

    propTypes: {
        rows: PropTypes.array.isRequired,
        rowSelectedHandler: PropTypes.func
    },

    tableRowSelected: function(index, item) {
        /* we also need to handle the custom handler passed in to
         * the table component on row selection if there is one.
         */
         if (this.props.rowSelectedHandler) {
            this.props.rowSelectedHandler(item);
         }
    },

    render: function() {
        
        return (
            <table className='component__colorTable'>
                <tbody>
                    {this.props.rows.map(function(rowItem, idx) {
                        var rowSelected = rowItem.highlight;
                        var rowStyle = rowSelected ? { 'opacity': '0.5' } : {};
                        var style = rowItem.color ? _.extend(rowStyle, { 'borderLeft': '7px solid ' + rowItem.color }) : {}; 

                        return (
                            <tr key={idx} style={style} onClick={rowItem.selectable ?
                                    this.tableRowSelected.bind(this, idx, rowItem) : null}>

                                <td className='colorTableTitle'>{rowItem.title}</td>
                                    
                                { 'date' in rowItem ? 
                                    <td className='colorTableDate'>{rowItem.date}</td>
                                : null }

                                { rowItem.details ?
                                    <td className='colorTableArrow'>
                                        <FaIcon.Icon name={'chevron-right'}/>
                                    </td>
                                : null }

                                { rowSelected ?
                                    <td className='selectedCheck'>
                                        <FaIcon.Icon name='check-circle-o' />
                                    </td>
                                :
                                    <td></td>
                                }
                            </tr>
                        );
                    }, this)}
                </tbody>
            </table>
        );
    }
});
