import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const SearchInput = styled('div')(({ theme }) => ({
    position: 'relative',
    marginLeft: 0,
    marginTop: 16,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.primary.dark,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        borderRadius: theme.shape.borderRadius,
        border: '2px solid',
        borderColor: theme.palette.primary.light,
        '&:hover': {
            borderColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up('sm')]: {
            width: '32ch',
            '&:focus': {
                width: '40ch',
                borderColor: theme.palette.primary.main,
            },
        },
        [theme.breakpoints.up('md')]: {
            width: '48ch',
            '&:focus': {
                width: '60ch',
            },
        },
    },
}));

const MainStack = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(6, 4, 12, 4)
}));

const Search = ({handleSearch}) => {
    const [searchKey, setSearchKey] = useState('');
    return (
        <MainStack
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography variant="h4" gutterBottom>Stunning free images & royalty free stock</Typography>
            <Typography variant="body1">Over 2.5 million+ high quality stock images, shared by talented community on Pixabay.</Typography>
            <SearchInput>
                <SearchIconWrapper>
                    <SearchIcon color='primary' />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search Images"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter'){
                            handleSearch(searchKey);
                        }
                    }}
                />
            </SearchInput>
        </MainStack>
    )
}

export default Search
