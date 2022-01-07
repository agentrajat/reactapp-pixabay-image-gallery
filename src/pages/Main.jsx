import React, { useEffect, useState } from 'react'
import { SearchPixabayImages } from '../api/fetchApi';
import ImageGallery from '../components/ImageGallery';
import Search from '../components/Search';

const Main = () => {
    const [imageData, setImageData] = useState([]);
    const [query, setQuery] = useState('');

    const handleSearch = (search) => {
        setQuery(search);
    }

    useEffect(() => {
        SearchPixabayImages(query, 1, 10, (data) => {
            console.log(data);
            setImageData(data?.hits);
        }, (error) => {
            console.log(error);
        });
    }, [query]);

    return (
        <>
            <Search handleSearch={handleSearch} />
            <ImageGallery itemData={imageData} />
        </>
    )
}

export default Main;
