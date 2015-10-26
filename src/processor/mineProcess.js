function mineProcess(sb) {
    'use strict';

    //constructor() {
    var routeDone = false;

    var camera = sb.getCamera();
    var em = sb.getEntityManager();

    //}

    var update = function(deltatime, timeFromStart) {

        //we don't instantly harass the player
        // if (timeFromStart < 30000) {
        //return false;
        // }

        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.RenderableComponent &&
                le.components.MeshComponent &&
                le.components.EnemyComponent) {

                var ship = em.getEntityByName('ship');
                //if normal ship is dead we target the mothership
                if (!ship || ship.components.HealthComponent.amount < 1) {
                    ship = em.getEntityByName('mothership');
                }
                var re = le.components.RenderableComponent;
                var enemyHp = le.components.HealthComponent;
                var shiprc = ship.components.RenderableComponent;
                var hc = ship.components.HealthComponent;
                var sc = ship.components.ShieldComponent;

                if (enemyHp.getAmount() > 0) {

                    if (isClose(re.getXPos(), shiprc.getXPos()) &&
                        isClose(re.getZPos(), shiprc.getZPos())) {

                        sb.publish('collision', [ship.components.CollisionComponent, le.componets.CollisionComponent]);

                    }
                }

                //newX and newZ are false by default so we don't move anywhere if newpos is not set
                if (!routeDone) {

                    var dirZ = ship.components.RenderableComponent.getZPos() - re.getXPos();
                    var dirX = ship.components.RenderableComponent.getXPos() - re.getZPos();

                    //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                    var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);

                    var angR = Math.atan2(dirX, dirZ);
                    var deg = (angR / Math.PI * 180) - 90 + (angR > 0 ? 0 : 360);

                    dirX /= hyp;
                    dirZ /= hyp;

                    //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                    re.setZPos(re.getZPos() + dirX * le.components.EnemyComponent.getSpeed() * (deltatime / 1000));
                    re.setXPos(re.getXPos() + dirZ * le.components.EnemyComponent.getSpeed() * (deltatime / 1000));
                    //re.yPos = 0;

                    re.setAngleY(deg);

                }
            }
        }
    };
    return Object.freeze({
        update, draw: function() {
        }, init: function() {
        }
    });

}