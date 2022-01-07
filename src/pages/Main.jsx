import { Pagination, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { SearchPixabayImages } from '../api/fetchApi';
import ImageGallery from '../components/ImageGallery';
import Search from '../components/Search';

const defaultSearchData = {
    page: 1,
    query: ''
};

const Main = () => {
    const [imageData, setImageData] = useState([]);

    // TODO: Move this to local storage or cache
    const [imageStore, setImageStore] = useState({});
    const [searchData, setSearchData] = useState(defaultSearchData);
    const [maxPages, setMaxPages] = useState(1);

    const handleSearch = (search) => {
        setSearchData({
            query: search,
            page: 1
        });
    };

    const handlePageChange = (event, value) => {
        setSearchData({
            ...searchData,
            page: value
        });
    };

    const invokeSearch = (q, page, per_page) => {
        if(imageStore[q] && imageStore[q][page]){
            console.log("Setting from local");
            const localPage = imageStore[q][page];
            setImageData(localPage.hits);
            setMaxPages(Math.round(localPage.totalHits / per_page));
        }else{
            // Load from Server
            console.log("Fetching from API");
            SearchPixabayImages(q, page, per_page, (data) => {
                console.log(data);
                setImageData(data?.hits);
                setMaxPages(Math.round(data?.totalHits / per_page));
    
                setImageStore({
                    ...imageStore,
                    [q]: {
                        ...imageStore[q],
                        [page]: data
                    }
                });
            }, (error) => {
                console.log(error);
                alert('Service not available, please contact the developer!')
            });
        }
    }

    useEffect(() => {
        invokeSearch(searchData.query, searchData.page, 10);
    }, [searchData]);

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Search handleSearch={handleSearch} />
            <ImageGallery itemData={imageData} />
            <Pagination color='primary' size='large' count={maxPages} page={searchData.page} onChange={handlePageChange} style={{marginTop: 16}}/>
        </Stack>
    )
}

export default Main;
