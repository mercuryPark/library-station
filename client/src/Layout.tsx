import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import LinkCard from "./components/LinkCard";
import { API_LINKS } from "./service/link";
import _ from "lodash";
import { Link } from "./types/link";

const Layout = () => {
    const [data, setData] = useState();
    const getLinks = async () => {
        const res = await API_LINKS();
        setData(res.data);
    };

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div className='h-screen flex'>
            <SideBar />
            <div className='flex gap-4 p-[1rem]'>
                {_.map(data, (link: Link) => {
                    return <LinkCard link={link} />;
                })}
            </div>
        </div>
    );
};

export default Layout;
