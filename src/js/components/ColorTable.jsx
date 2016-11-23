var React = require('react'),
    PropTypes = React.PropTypes,
    FaIcon = require('react-fa');

module.exports = React.createClass({

    displayName: 'ColorTable',

    propTypes: {
        rows: PropTypes.array.isRequired,
        rowSelectedHandler: PropTypes.func
    },

    getInitialState: function() {
        return {
            highlightedRows: {}
        };
    },

    tableRowSelected: function(index, item) {

        /* handle the highlighting section of the table row */
        var rowId = 'row' + index;
        var newRows = this.state.highlightedRows;

        if (rowId in this.state.highlightedRows) {
            newRows[rowId].highlighted = !(this.state.highlightedRows[rowId].highlighted);
        } else {
            newRows[rowId] = { highlighted: true };
        }

        this.setState({
            hightlightedRows: newRows
        });

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
                        var rowId = 'row' + idx;
                        var rowSelected = rowItem.selectable && (rowId in this.state.highlightedRows) &&
                            this.state.hightlightedRows[rowId].highlighted;
                        var rowStyle = rowSelected ? { 'opacity': '0.5' } : {};
                        var style = rowItem.color ? { 'borderLeft': '7px solid ' + rowItem.color } : {}; 

                        return (
                            <tr key={idx} style={rowStyle} onClick={rowItem.selectable ?
                                    this.tableRowSelected.bind(this, idx, rowItem) : null}>

                                <td className='ctCell' style={style}>
                                    <div className='colorTableTitle'>{rowItem.title}</div>
                                    
                                    {'date' in rowItem ? 
                                        <div className='colorTableDate'>{rowItem.date}</div>
                                    : null}

                                    {rowItem.details ?
                                        <div className='colorTableArrow'>
                                            <FaIcon.Icon name={'chevron-right'}/>
                                        </div>
                                    : null}

                                    {rowSelected ?
                                        <div className='selectedCheck'>
                                            <FaIcon.Icon name='check-circle-o' />
                                        </div>
                                    : null}
                                </td>
                            </tr>
                        );
                    }, this)}
                </tbody>
            </table>
        );
    }
});
