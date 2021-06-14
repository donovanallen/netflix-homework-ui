const body = document.querySelector('body');
let galleryEl;
let allData;

const billboardTypes = [
    {
        type: 'header',
        create(metadata) {
            const videoMetadata = allData.videos.find(video => video.id === metadata.id);

            // .row-billboard
            const billboardRowEl = document.createElement('div');
            billboardRowEl.className = 'row-billboard';

            // .billboard-background
            const backgroundImgEl = document.createElement('img');
            backgroundImgEl.setAttribute('src', videoMetadata.background);
            backgroundImgEl.setAttribute('alt', videoMetadata.title);
            backgroundImgEl.className = 'billboard-background';
            
            // .billboard-metadata
            const metadataEl = document.createElement('div');
            metadataEl.className = 'billboard-metadata'
            // .billboard-metadata-logo
            const metadataLogoEl = document.createElement('img');
            metadataLogoEl.setAttribute('src', videoMetadata.logo);
            metadataLogoEl.setAttribute('alt', `${videoMetadata.title} logo`);
            metadataLogoEl.className = 'billboard-metadata-logo'
            metadataEl.appendChild(metadataLogoEl);

            // .billboard-metadata-synopsis
            const metadataSynopsisEl = document.createElement('p');
            metadataSynopsisEl.innerHTML = videoMetadata.synopsis
            metadataSynopsisEl.className = 'billboard-metadata-synopsis';
            metadataEl.appendChild(metadataSynopsisEl);
            
            for (let i = 0; i < metadata.buttons.length; i++) {
                const element = metadata.buttons[i];
                // .billboard-metadata-button
                const metadataBtnEl = document.createElement('button');
                metadataBtnEl.innerText  = metadata.buttons[i].text;
                metadataBtnEl.className = 'billboard-metadata-button';
                if (metadata.buttons[i].type === 'play') {
                    metadataBtnEl.classList.add('billboard-metadata-button-play');
                    metadataSynopsisEl.insertAdjacentElement('afterend', metadataBtnEl);
                } else {
                    metadataEl.append(metadataBtnEl);
                }
            }
            
            billboardRowEl.appendChild(backgroundImgEl);
            billboardRowEl.appendChild(metadataEl);
            galleryEl.appendChild(billboardRowEl);
        }
    },
    {
        type: 'inline',
        create(metadata) {
            const videoMetadata = allData.videos.find(video => video.id === metadata.id);
            
            // .row-billboard-inline
            const billboardRowEl = document.createElement('div');
            billboardRowEl.className = 'row-billboard-inline row-billboard';

            // .billboard-background
            const backgroundImgEl = document.createElement('img');
            backgroundImgEl.setAttribute('src', videoMetadata.backgroundShort);
            backgroundImgEl.setAttribute('alt', videoMetadata.title);
            backgroundImgEl.className = 'billboard-background';
            
            // .billboard-metadata
            const metadataEl = document.createElement('div');
            metadataEl.className = 'billboard-metadata'
            // .billboard-metadata-logo
            const metadataLogoEl = document.createElement('img');
            metadataLogoEl.setAttribute('src', videoMetadata.logo);
            metadataLogoEl.setAttribute('alt', `${videoMetadata.title} logo`);
            metadataLogoEl.className = 'billboard-metadata-logo'
            
            metadataEl.appendChild(metadataLogoEl);
            
            for (let i = 0; i < metadata.buttons.length; i++) {
                const element = metadata.buttons[i];
                // .billboard-metadata-button
                const metadataBtnEl = document.createElement('button');
                metadataBtnEl.className = metadata.buttons[i].type === 'play' ? `billboard-metadata-button billboard-metadata-button-${metadata.buttons[i].type}` : 'billboard-metadata-button';
                metadataBtnEl.innerText  = metadata.buttons[i].text;
                metadataEl.appendChild(metadataBtnEl);
            }
            
            billboardRowEl.appendChild(backgroundImgEl);
            billboardRowEl.appendChild(metadataEl);
            galleryEl.appendChild(billboardRowEl);            
        }
    },
]

export const render = data => {
    if (data.rows) {
        initiateGallery(body);
        getData(data);
    } else {
        console.error('No videos available to display');
    }
};

const initiateGallery = parentEl => {
    galleryEl = document.createElement('div');
    galleryEl.className = ('gallery');
    parentEl.appendChild(galleryEl);
}

export const getData = data => {
    allData = data;
    setRows(data.rows || []);
}

const setRows = rows => {
    for (let i = 0; i < rows.length; i++) {
        rows[i].length === 1 ? createBillboardRow(...rows[i], i) : createBoxshotRow(rows[i]);
    }
}

const createBillboardRow = (videoId, rowIndex) => {
    const billboardMetadata = allData.billboards.find(bb => bb.row === rowIndex);
    billboardMetadata.id = videoId;
    createBillboardByType(billboardMetadata);
}

const createBillboardByType = metadata => billboardTypes.find(bb => bb.type === metadata.type)?.create(metadata);

const createBoxshotRow = row => {
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
    const boxshotEl = document.createElement('div');
    boxshotEl.className = 'boxshot';
    boxshotEl.appendChild(getBoxShotImg(videoId));
    return boxshotEl;
}

const getBoxShotImg = id => {
    const videoMetadata = allData.videos.find(video => video.id === id);
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', videoMetadata.boxart);
    imgEl.setAttribute('alt', videoMetadata.title);
    return imgEl;
}

// cleanup