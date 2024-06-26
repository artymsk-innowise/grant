import { Flex, Layout as AntdLayout } from "antd";
import { Outlet } from "react-router";
import { Header } from "../Header";

import classes from "./Layout.module.css";

export const Layout = () => {
    return (
        <Flex gap="middle" wrap className={classes.fullPageSize}>
            <AntdLayout className={classes.fullPageSize}>
                <Header />
                <Flex vertical justify="start" className={classes.contentWrapper}>
                    <Outlet />
                </Flex>
            </AntdLayout>
        </Flex>
    );
};
