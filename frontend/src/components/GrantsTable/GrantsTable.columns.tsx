import { Tag } from "antd";
import { SavedGrant } from "../../types/grants";
import { format, parseISO } from "date-fns";

export const TABLE_COLUMNS = [
    {
        title: "Foundation name",
        dataIndex: "foundation",
        key: "foundation",
        render: (_, record: SavedGrant) => record.grant.foundation,
        sorter: (a: SavedGrant, b: SavedGrant) =>
            a.grant.foundation.localeCompare(b.grant.foundation),
    },
    {
        title: "Grant name",
        dataIndex: "name",
        key: "name",
        render: (_, record: SavedGrant) => record.grant.name,
        sorter: (a: SavedGrant, b: SavedGrant) =>
            a.grant.name.localeCompare(b.grant.name),
    },
    {
        title: "Average amount",
        dataIndex: "amount",
        key: "amount",
        render: (_, record: SavedGrant) => {
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
            });

            return formatter.format(record.grant.amount);
        },
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, record: SavedGrant) => (
            <Tag color="default"> {record.status} </Tag>
        ),
    },
    {
        title: "Deadline",
        dataIndex: "deadline",
        key: "deadline",
        render: (_, record: SavedGrant) =>
            format(parseISO(record.grant.deadline), "MMMM Lo"),
    },
    {
        title: "Match date",
        dataIndex: "matchDate",
        key: "matchDate",
        render: (_, record: SavedGrant) =>
            format(parseISO(record.matchDate), "dd MMMM yyyy"),
    },
];
