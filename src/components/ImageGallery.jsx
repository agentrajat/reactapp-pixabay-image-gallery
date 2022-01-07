import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';
import ImageViewer from './ImageViewer';

const ImageGalleryList = styled('ul')(({ theme }) => ({
    display: 'grid',
    padding: 0,
    margin: theme.spacing(0, 4),
    gap: 16,
    // width: '100%',
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)'
    },
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, 1fr)'
    },
    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(5, 1fr)'
    },
}));

const ImageItem = styled(ImageListItem)(({ theme }) => ({
    cursor: 'pointer',
    transition: 'transform 0.25s',
    '&:hover': {
        transform: 'scale(1.025)'
    },
}));

const defaultImageDetail = {
    open: false
};

export default function ImageGallery({itemData}) {
    const [imageDetail, setImageDetail] = React.useState(defaultImageDetail);

    const handleOpenImageViewer = (imageData) => {
        setImageDetail({
            open: true,
            imageData
        });
      };
    
      const handleCloseImageViewer = () => {
        setImageDetail(defaultImageDetail);
      };

    return (
        <ImageGalleryList>
            {itemData?.map((item) => (
                <ImageItem key={item.id} sx={{overflow: 'hidden', borderRadius: 1}} onClick={() => handleOpenImageViewer(item)}>
                    <img
                        src={item.webformatURL}
                        alt={item.type}
                        loading="lazy"
                    />
                </ImageItem>
            ))}
            <ImageViewer imageDetail={imageDetail} onClose={handleCloseImageViewer}/>
        </ImageGalleryList>
    );
}