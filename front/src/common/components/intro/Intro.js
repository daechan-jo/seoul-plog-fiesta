import React from 'react';
import style from "./intro.module.scss"
const Intro = () => {
    return (
        <div className={style.Introcontainer}>
            <div className={style.title}>
                Plogging
                <span>[ plocka upp + jogging]</span>
            </div>
            <div className={style.summary}>
                조깅을 하는 동안 눈에 띄는 쓰레기를 줍는 일.<br />
                운동으로 건강을 챙기는 동시에 환경을 지키기 위한 작은 실천에 동참하자는 취지로 행하는 환경보호 운동</div>
            <div className={style.sideImage}>
                <div className={style.rankImage}>

                </div>
            </div>
        </div >
    );
};

export default Intro;
