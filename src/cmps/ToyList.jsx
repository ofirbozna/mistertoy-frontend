import { ToyPreview } from "./toyPreview.jsx"
import { Link } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button ><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                    </div>

                </li >)
            }
        </ul >
    )

}