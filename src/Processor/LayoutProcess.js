class LayoutProcess extends Processor {

    constructor() {
        this.particleProgram = sm.init('particle');
    }

    simpleWorldToViewX(x) {
        return x / resolutionWidth;
    }

    simpleWorldToViewY(y) {

        return y / resolutionHeight;
    }

    recursiveLayout(lloop) {
        for(var i = 0;i<lloop.length;i++) {

            if(lloop.xPos<1 && lloop.yPos<1 && lloop.rootX == null && lloop.rootY == null) {
                lloop.rootX = simpleWorldToViewX(lloop.xPos);
                lloop.rootY = simpleWorldToViewX(lloop.yPos);
            }
            else {
                return false;
            }

            if(lloop.sprite) {


            }


            if(lloop[i].children.length>0)
            {
                this.recursiveLayout(lloop[i].children);
            }
        }

    }

    draw() {

        this.recursiveLayout(lm);

/*
        for (var e = 0; e < em.entities.length; e++) {
            var le = em.entities[e];

            if (le.components.GuiComponent && le.components.GuiComponent.sprites) {
                //  console.log(le.components.HealthComponent);

                gl.useProgram(this.particleProgram);
                var guiSprites = le.components.GuiComponent.sprites;
                for (var g = 0; g < guiSprites.length; g++) {


                    camera.mvPushMatrix();
                    gl.uniform3f(this.particleProgram.positionUniform, g / 30, 0, 0);
                    gl.bindBuffer(gl.ARRAY_BUFFER, guiSprites[g].pointStartPositionsBuffer);
                    gl.vertexAttribPointer(this.particleProgram.pointStartPositionAttribute, guiSprites[g].pointStartPositionsBuffer.itemSize, gl.FLOAT, false, 0, 0);


                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, guiSprites[g].texture);
                    gl.uniform1i(this.particleProgram.samplerUniform, 0);
                    gl.uniform1f(this.particleProgram.pointSize, 16.0);

                    gl.uniform4f(this.particleProgram.colorUniform, 1, 1, 1, 1);


                    gl.drawArrays(gl.POINTS, 0, 1);
                    camera.drawCalls++;

                    camera.mvPopMatrix();
                }

            }

        }
*/
    }


}