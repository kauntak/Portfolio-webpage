module.exports = {assignRoles};

var rolesCount = {
    4:{wolf:1, citizen:2, prophet:1},
    5:{wolf:1, citizen:3, prophet:1},
    6:{wolf:2, citizen:2, prophet:1, knight:1},
    7:{wolf:2, citizen:3, prophet:1, knight:1},
    8:{wolf:2, citizen:3, prophet:1, knight:1, traitor:1},
    9:{wolf:2, citizen:3, prophet:1, knight:1, traitor:1, shaman:1},
    10:{wolf:2, citizen:4, prophet:1, knight:1, traitor:1, shaman:1},
    11:{wolf:3, citizen:4, prophet:1, knight:1, traitor:1, shaman:1},
    12:{wolf:3, citizen:5, prophet:1, knight:1, traitor:1, shaman:1},
    13:{wolf:3, citizen:5, prophet:1, knight:1, traitor:2, shaman:1},
    14:{wolf:3, citizen:6, prophet:1, knight:1, traitor:2, shaman:1},
    15:{wolf:4, citizen:6, prophet:1, knight:1, traitor:2, shaman:1}
}


function assignRoles(players){
    var roles = getRoles(players.length);
    for(let i in players){
        players[i].role = getRandomRole(roles);
    }
}

function getRoles(count){
    let roles;
    if(count <= 15){
        roles = rolesCount[count];
    } else{
        roles = rolesCount[15];
        let rolesLeft = count - 15;
        while(rolesLeft > 0){
            let roleSum = rolesSum(roles);
            if(rolesSide.citizenSide - roleSum.wolfSide == 2){
                roles.wolf++;
            } else {
                roles.citizen++;
            }
            rolesLeft--;
        }
    }
    let rolesList = [];
    for(let i in roles){
        for(let j = 0; j < roles[i]; j++){
            rolesList.push(i);
        }
    }
    return rolesList;
}
function rolesSum(roles){
    return {wolfSide:(roles.wolf + roles.traitor),  citizenSide:(roles.citizen + roles.prophet + roles.knight + roles.shaman)};
}

function getRandomRole(roles){
    let index = Math.floor(Math.random() * roles.length);
    return roles.splice(index, 1)[0];
}