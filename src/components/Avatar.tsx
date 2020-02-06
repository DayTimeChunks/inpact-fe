import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";


interface IAvatarProps {
    avatar: string;
    removeImage: (x: string) => void;
}

export class Avatar extends React.Component<IAvatarProps, {}> {

    public render() {
        const {removeImage, avatar} = this.props;

        return (
            <div>
                <div onClick={() => removeImage("test")} className='delete'>
                    <FontAwesomeIcon icon={faTimesCircle} size='2x' />
                </div>
                <img src={avatar} alt='avatar' width="100" height="100" />
            </div>
        );
    }
};
