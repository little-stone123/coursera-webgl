/**
 * Sphere
 */
(function(window) {
  'use strict';

  var Sphere = {

    generate: function(opts) {
      var lats = 30,
        longs = 30,
        radius = 1,
        uniqueVertices = [],
        vertices = [],
        indices = [],
        uniqueNormals = [],
        normals = [];

      for (var latNumber = 0; latNumber <= lats; ++latNumber) {
        for (var longNumber = 0; longNumber <= longs; ++longNumber) {
          var theta = latNumber * Math.PI / lats;
          var phi = longNumber * 2 * Math.PI / longs;
          var sinTheta = Math.sin(theta);
          var sinPhi = Math.sin(phi);
          var cosTheta = Math.cos(theta);
          var cosPhi = Math.cos(phi);

          var x = cosPhi * sinTheta;
          var y = cosTheta;
          var z = sinPhi * sinTheta;

          uniqueVertices.push(vec4(radius * x, radius * y, radius * z, 1.0));
          uniqueNormals.push(vec3(x, y, z));
        }
      }

      for (var latNumberI = 0; latNumberI < lats; ++latNumberI) {
        for (var longNumberI = 0; longNumberI < longs; ++longNumberI) {
          var first = (latNumberI * (longs+1)) + longNumberI;
          var second = first + longs + 1;

          indices.push(first);
          vertices.push(uniqueVertices[first]);
          normals.push(uniqueNormals[first]);

          indices.push(second);
          vertices.push(uniqueVertices[second]);
          normals.push(uniqueNormals[second]);

          indices.push(first+1);
          vertices.push(uniqueVertices[first+1]);
          normals.push(uniqueNormals[first+1]);

          indices.push(second);
          vertices.push(uniqueVertices[second]);
          normals.push(uniqueNormals[second]);

          indices.push(second+1);
          vertices.push(uniqueVertices[second+1]);
          normals.push(uniqueNormals[second+1]);

          indices.push(first+1);
          vertices.push(uniqueVertices[first+1]);
          normals.push(uniqueNormals[first+1]);
        }
      }

      return {
        v: vertices,
        i: indices,
        n: normals
      };
    }

  };

  window.Sphere = Sphere;

})(window);
