import { Button, Divider, Flex, Typography } from "antd";
import { Grant } from "../../../types/grants";
import { DollarOutlined } from "@ant-design/icons";
import classes from "./GrantItem.module.css";
import { format, parseISO } from "date-fns";
import { Header } from "./Header";
import { Description } from "./Description";
import { Areas } from "./Areas";

const { Title } = Typography;

type GrantItemProps = {
    grant: Grant;
};

const DatesSection = ({ grant }: { grant: Grant }) => {
    const deadlineDate = parseISO(grant.deadline);

    return (
        <Flex className={classes.dates} vertical>
            <Flex vertical>
                <Title level={5} style={{ color: "#8f8f8f" }}>
                    Deadline
                </Title>
                <Title level={5}>{format(deadlineDate, "MMMM Lo")}</Title>
            </Flex>
            <Divider />
            <Flex vertical>
                <Title level={5} style={{ color: "#8f8f8f" }}>
                    Getting started
                </Title>
                <Title level={5}>{format(deadlineDate, "MMMM Lo")}</Title>
            </Flex>
        </Flex>
    );
};

const AmountSection = ({ grant }: { grant: Grant }) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    });

    return (
        <Flex className={classes.averageAmount}>
            <Flex vertical justify="space-between">
                <DollarOutlined className={classes.dollarIcon} />
                <Flex vertical>
                    <Title level={4} style={{ color: "#f08764" }}>
                        {formatter.format(grant.amount)}
                    </Title>
                    <Title level={5}>Avg Amount</Title>
                </Flex>
            </Flex>
        </Flex>
    );
};

const Location = ({ grant }: { grant: Grant }) => {
    return (
        <Flex justify="space-between">
            <Title level={5} style={{ color: "#8f8f8f" }}>
                Location
            </Title>
            <Title level={5}>{grant.location}</Title>
        </Flex>
    );
};

export const GrantItem = ({ grant }: GrantItemProps) => {
    return (
        <Flex vertical className={classes.grantItem}>
            <Header grant={grant} />
            <Description grant={grant} />
            <Flex justify="space-between">
                <AmountSection grant={grant} />

                <DatesSection grant={grant} />
            </Flex>
            <Location grant={grant} />
            <Areas grant={grant} />

            <Button size="large" type="primary" className={classes.applyButton}>
                Apply here
            </Button>
        </Flex>
    );
};
