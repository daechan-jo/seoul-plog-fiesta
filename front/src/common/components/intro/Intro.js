import React from 'react';
import style from "./intro.module.scss"
import { useNavigate } from "react-router-dom";


const Intro = ({ rank }) => {
    const navigate = useNavigate()
    const loginForm = () => {
        navigate("/login")
    }
    const registerForm = () => {
        navigate("/register")
    }
    const mainMove = () => {
        navigate("/")
    }
    return (
        <div className={style.IntroContainer}>
            <div className={style.TextContainer}>
                <div className={style.title}>
                    Plogging
                    <span>[ plocka upp + jogging]</span>
                </div>
                <div className={style.summary}>
                    조깅을 하는 동안 눈에 띄는 쓰레기를 줍는 일.<br />
                    운동으로 건강을 챙기는 동시에 환경을 지키기 위한 작은 실천에 동참하자는 취지로 행하는 환경보호 운동
                </div>
            </div>
            <div className={style.sideImage}>
                <div className={style.rankBox}>
                    <div className={style.rankTitle}>랭킹</div>
                    <div className={style.ranks}>
                        <div className={style.rankBack}>1위</div><div className={style.profile} /></div>
                    <div className={style.ranks}><span className={style.rankBack}>2위</span><div className={style.profile} /></div>
                    <div className={style.ranks}><span className={style.rankBack}>3위</span><div className={style.profile} /></div>
                    <div className={style.ranks}><span className={style.rankBack}>4위</span><div className={style.profile} /></div>
                    <div className={style.ranks}><span className={style.rankBack}>5위</span><div className={style.profile} /></div>
                </div>
            </div>
            <div className={style.ButtonContainer}>
                <button className={style.main} onClick={mainMove}>메인으로</button>
                <button className={style.login} onClick={loginForm}>로그인하기</button>
                <button className={style.register} onClick={registerForm}>회원가입하기</button>
            </div>
        </div >
    );
};

export default Intro;
