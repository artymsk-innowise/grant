import { Flex, Typography } from "antd";

import classes from "./Section.module.css";

const { Title } = Typography;

type SectionProps = {
    title: string;
};

export const Section = ({
    title,
    children,
}: React.PropsWithChildren<SectionProps>) => {
    return (
        <Flex vertical className={classes.section}>
            <Title level={2} className={classes.title}>
                {title}
            </Title>
            {children}
        </Flex>
    );
};
