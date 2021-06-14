const body = document.querySelector('body');
let galleryEl;
let allData;

export function render(data) {
    if (data.rows) {
        initiateGallery();
        getData(data);
    } else {
        // display message
        console.error('No videos available to display');
    }
};

const initiateGallery = () => {
    galleryEl = document.createElement('div');
    galleryEl.className = ('gallery');
    body.appendChild(galleryEl);
    console.log(body);
}

export function getData(data) {
    allData = data;
    setRows(data.rows || []);

    // getBillboards by id
    // set billboard-inline
}

export const setRows = rows => {
    console.log('setRows, rows:', rows);
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        createBoxshotRow(row);
    }
    console.log(body);
}

export const createBoxshotRow = row => {
    console.log('createBoxshotRow, row:', row);
    const boxShotRowEl = document.createElement('div');
    boxShotRowEl.className = 'row-videos';
    galleryEl.appendChild(boxShotRowEl);

    setBoxshots(row, boxShotRowEl);
}

const setBoxshots = (row, el) => {
    for (let i = 0; i < row.length; i++) {
        const videoId = row[i];
        const boxshotToAppend = createBoxshot(videoId);
        el.appendChild(boxshotToAppend);
    }
}

const createBoxshot = videoId => {
    const boxshot = document.createElement('div');
    boxshot.className = 'boxshot';
    const video = getBoxShotVideo(videoId);
    console.log('video', video);
    
    // set boxshot element title and boxart from video properties
    return boxshot;
}

const getBoxShotVideo = id => {
    return allData.videos.find(video => video.id === id);
}

// flex or something for row-videos container
// get videos boxart working
// fn's for billboard and billboard-inline
// cleanup