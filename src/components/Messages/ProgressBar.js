// import React from 'react';
// import { Progress } from 'semantic-ui-react';

// const ProgressBar = ({uploadState, percentUploaded}) => (
//     uploadState === 'uploading' && (   //remove === uploading for progressBar adjustment
//         <Progress
//             className='progress__bar'
//             percent={percentUploaded}
//             progress
//             indicating
//             size='medium'
//             inverted
//         />
//     )
// );

// export default ProgressBar;





import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ uploadState, percentUploaded }) =>
    uploadState === "uploading" && (
        <Progress
            className="progress__bar"
            percent={percentUploaded}
            progress
            indicating
            size="medium"
            inverted
        />
    );

export default ProgressBar;
