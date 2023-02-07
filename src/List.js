import { Pen } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons'
function List({ items,removeItem,editItem}) {
    return (
        <>
            <h2>Items</h2>
            {items.map((item) => {
                return (<div className="items shadow p-2 mb-2 bg-white rounded d-flex justify-content-between ">{item.title}
                    <div className="btn-group">
                        <button type="button" className="btn btn-success" onClick={()=>editItem(item.id)}><Pen /></button>
                        <button type="button" className="btn btn-danger" onClick={()=>removeItem(item.id)}><Trash /></button>
                    </div>
                </div>)
            })}
        </>
    )
}
export default List;