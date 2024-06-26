import { Flex } from "antd";
import { Grant } from "../../../../types/grants";
import { Typography } from "antd";
import classes from "./Areas.module.css";

const { Title } = Typography;

export const Areas = ({ grant }: { grant: Grant }) => {
    return (
        <Flex vertical>
            <Title level={5} style={{ color: "#8f8f8f" }}>
                Area of Funding
            </Title>
            <Flex justify="flex-start" wrap="wrap" gap={5}>
                {grant?.areas?.map((area) => (
                    <span key={area} className={classes.area}>
                        {area}
                    </span>
                ))}
            </Flex>
        </Flex>
    );
};
