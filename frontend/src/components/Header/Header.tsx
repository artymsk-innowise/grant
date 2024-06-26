import { Flex, Layout, Menu, MenuProps, Avatar } from "antd";

import classes from "./Header.module.css";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    {
        label: "Social media",
        key: "socialMedia",
    },

    {
        label: "Grants",
        key: "SubMenu",
        children: [
            { label: "Posts approval", key: "grants:1" },
            { label: "Social calendar", key: "grants:2" },
        ],
    },
];

export const Header = () => {
    const [current, setCurrent] = useState("socialMedia");

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Layout.Header className={classes.header}>
            <Flex align="center" className={classes.wrapper}>
                <span className={classes.logo}>Vee</span>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                    className={classes.menu}
                />

                <Avatar className={classes.avatar} size="small">
                    D
                </Avatar>
            </Flex>
        </Layout.Header>
    );
};
