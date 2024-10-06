
import { Link } from "react-router-dom";
import style from "../../styles/Page404.module.scss";


export default function Page404() {

    return (
        <section className={style.page_404}>
            <div className={style.content}>
                <div className={style.four_zero_four_bg}>
                    <h1 className={style.text}>404</h1>
                </div>

                <div className={style.contant_box_404}>
                    <h3 className={style.h2}>
                Look like you&apos;re lost
                    </h3>

                    <p>
                The page you are looking for not avaible!
                    </p>

                    <Link to="/" className={style.link_404}>Go to Home</Link>
                </div>
            </div>
        </section>
    );

}