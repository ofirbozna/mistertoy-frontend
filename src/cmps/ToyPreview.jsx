import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price}</span></p>
            <p className={'status' + ( toy.inStock? ' in-stock': ' out-of-stock')}>{toy.inStock ? 'In Stock' : 'Out of stock'}</p>
        </article>
    )
}