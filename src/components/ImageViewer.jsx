import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Avatar, Chip, DialogContent, DialogContentText, Grid, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import millify from 'millify';

export default function ImageViewer({ onClose, imageDetail }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { open, imageData } = imageDetail;

  const handleClose = () => {
    onClose();
  };

  const getNameFromUrl = (pageURL) => {
    // Need to get Image Name from pageURL because API doesnot return any image name!!!
    const staticURL = "https://pixabay.com/photos/";
    let name = pageURL.substring(staticURL.length);
    let arr = name.split('-');
    let string = "";
    arr.forEach(element => {
      if (!parseInt(element)) {
        string += element.charAt(0).toUpperCase() + element.slice(1) + " ";
      }
    });
    return string;
  }

  const getTags = (tags) => {
    return tags.split(',').map((item) => (
      <Chip key={item} label={"#" + item.trim()} variant="outlined" color='primary' style={{ margin: "4px" }} />
    ));
  }
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'lg'} fullScreen={fullScreen}>
      {imageData && <>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item md lg>
              <img style={{ maxWidth: "100%", maxHeight: "80vh" }} src={imageData.largeImageURL} alt="pixabay-img" />
              </Grid>
            <Grid item container md={4} xs={12} alignItems='center' direction="column">
              <Grid item><DialogTitle>{getNameFromUrl(imageData?.pageURL)}</DialogTitle></Grid>
              <Grid item container alignItems='center' justifyContent='flex-end'>
                Uploaded by {imageData.user}<Avatar alt={imageData.user} src={imageData.userImageURL} style={{ margin: "4px 4px 0px 8px" }} />
              </Grid>
              <Grid item container justifyContent='center' marginTop={2}>
                <Tooltip title="Views"><Chip style={{ margin: 4, padding: 4 }} avatar={<VisibilityIcon />} label={millify(imageData.views)} /></Tooltip>
                <Tooltip title="Likes"><Chip style={{ margin: 4, padding: 4 }} avatar={<ThumbUpIcon />} label={millify(imageData.likes)} /></Tooltip>
                <Tooltip title="Comments"><Chip style={{ margin: 4, padding: 4 }} avatar={<CommentIcon />} label={millify(imageData.comments)} /></Tooltip>
                <Tooltip title="Downloads"><Chip style={{ margin: 4, padding: 4 }} avatar={<DownloadIcon />} label={millify(imageData.downloads)} /></Tooltip>
              </Grid>
              <Grid item container direction="column" alignItems='center' justifyContent='center' md style={{ marginTop: "4px" }}>
                <Button variant='contained' href={imageData.pageURL} target="_blank">Download</Button>
                <DialogContentText mt={1} textAlign='center'>Original Resolution ({imageData.imageWidth + " x " + imageData.imageHeight})<br />Size: {millify(imageData.imageSize, {
                  units: ["B", "KB", "MB", "GB", "TB"],
                  space: true,
                })}</DialogContentText>
              </Grid>
              <Grid item container justifyContent='center' alignItems='end'>
                {getTags(imageData.tags)}
              </Grid>
              <Grid item container justifyContent='flex-end'><Button color='secondary' onClick={handleClose}>Close</Button></Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </>}
    </Dialog>
  );
}
