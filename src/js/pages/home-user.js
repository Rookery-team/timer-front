import {GroupsGrid} from "../groups";
import {GRID_TYPE_GROUPS_JOINED, GRID_TYPE_MY_GROUPS} from "../../config/groups";

export function initializeHomeUserPage () {
    initializeGroupsGrids();
}


function initializeGroupsGrids () {
    const myGroupsGrid = document.querySelector('#leftSection .groups-grid');
    const groupsJoinedGrid = document.querySelector('#rightSection .groups-grid');
    GroupsGrid({
        element: myGroupsGrid,
        type: GRID_TYPE_MY_GROUPS
    });
    GroupsGrid({
        element: groupsJoinedGrid,
        type: GRID_TYPE_GROUPS_JOINED
    });
}



function initializeJoinGroupModal () {
    const joinGroupModal = '';
}