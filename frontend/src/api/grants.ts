import { gql, useMutation, useQuery } from "@apollo/client";
import { Grant, SavedGrant } from "../types/grants";

const getGrantMatchesGql = gql`
    query {
        grantsMatches(userId: "4e7b8472-8183-4888-bfe5-f56356c927c8") {
            _id
            name
            amount
            foundation
            deadline
            location
            areas
        }
    }
`;

export const useGrantsMatchesQuery = () =>
    useQuery<{ grantsMatches: Grant[] }>(getGrantMatchesGql);

const getSavedGrantsQgl = gql`
    query {
        savedGrants(userId: "4e7b8472-8183-4888-bfe5-f56356c927c8") {
        status
        _id
        feedback
        matchDate
            grant {
                _id
                name
                amount
                foundation
                deadline
                location
                areas
            }
        }
    }
`;

export const useSavedGrantsQuery = () =>
    useQuery<{ savedGrants: SavedGrant[] }>(getSavedGrantsQgl);

const saveGrantGql = gql`
    mutation SaveGrant($grantId: String!, $feedback: String!) {
        saveGrant(
            userId: "4e7b8472-8183-4888-bfe5-f56356c927c8"
            grantId: $grantId
            feedback: $feedback
        ) {
            _id
            status
            feedback
            matchDate
        }
    }
`;

export const useSaveGrantMutation = () => useMutation(saveGrantGql);

const hideGrantGql = gql`
    mutation HideGrant($grantId: String!, $feedback: String!) {
        hideGrant(
            userId: "4e7b8472-8183-4888-bfe5-f56356c927c8"
            grantId: $grantId
            feedback: $feedback
        ) {
            _id
            feedback
        }
    }
`;

export const useHideGrantMutation = () => useMutation(hideGrantGql);
