import { Flex, Typography } from "antd";
import { Grant } from "../../../../types/grants";

const { Title } = Typography;

export const Description = ({ grant }: { grant: Grant }) => {
    return (
        <Flex vertical>
            <Title level={4}>{grant.name}</Title>
            <Title level={3}>{grant.foundation}</Title>
        </Flex>
    );
};
