import { MatrixDefinition } from "/state/MatrixDefinition.js"
import * as DefaultMatrices from "/scripts/default_matrices.js";


/**
 * Defines the components of the Protogen.
 */
export class ProtogenDefinition {
  /**
   * The Protogen's LED matrices.
   * @type {MatrixDefinition[]}
   */
  matrices = [];


  /**
   * Create and return a definition for the default Protogen.
   */
  static defaultProtogen() {
    const proot = new ProtogenDefinition();
    proot.matrices.push(DefaultMatrices.defaultFace());
    proot.matrices.push(DefaultMatrices.defaultCheeks());
    proot.matrices.push(DefaultMatrices.defaultShoulders());
    proot.matrices.push(DefaultMatrices.defaultLegs());
    return proot;
  }
}
