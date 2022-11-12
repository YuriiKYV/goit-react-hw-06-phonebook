import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filter-slice';

export default function Filter() {

    const filterValue = useSelector(store => store.filter)
    const dispatch = useDispatch();

    const handleChange = e => {
        const { value } = e.target;
        dispatch(setFilter(value))
        console.log()
    }

    return (
        <input type="text" name="filter" value={filterValue} onChange={handleChange}></input>
    )
}