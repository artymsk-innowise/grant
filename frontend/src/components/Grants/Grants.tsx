import { Flex } from "antd";
import { useGrantsMatchesQuery } from "../../api/grants";
import { GrantItem } from "./GrantItem";

export const Grants = () => {
    const { data } = useGrantsMatchesQuery();

    const { grantsMatches } = data || {};

    return (
        <Flex wrap="wrap" gap={20} justify="flex-start" align="flex-start" flex={1}>
            {grantsMatches?.map((grant) => (
                <GrantItem key={grant._id} grant={grant} />
            ))}
        </Flex>
    );
};
