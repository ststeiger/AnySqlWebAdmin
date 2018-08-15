
namespace Vectors
{


    public class cPolygon
    {

        public cPoint[] aptDefinitionPoints;
        

        public cPolygon()
        {
            // trace("cPolygon.Constructor");
            this.aptDefinitionPoints = new cPoint[] { };
        }  // End Constructor


        public uint FindNearestLineEndIndex(cPoint cptPointToAdd)
        {
            if (this.aptDefinitionPoints.Length == 0)

            {
                return 0;
            }

            if (this.aptDefinitionPoints.Length > 1)

            {
                double nOldDistance = 1000000;
                uint iOldIndex = 0;
                double nDistance = 0;
                cVector_2d vec2_LineStart = null;
                cVector_2d vec2_LineEnd = null;
                cVector_2d vec2_Point = null;
                cVector_2d vec2_VecLine = null;
                cPoint cptIntersectionPoint = null;


                bool bHasFirst = false;
                bool bHasLast = true;
                uint iFirst = 0;
                uint iLast = 0;

                for (uint i = 0; i < this.aptDefinitionPoints.Length; ++i)
                {
                    if (this.aptDefinitionPoints[i].bCurrentlyValid)
                    {
                        if (bHasFirst == false)
                        {
                            bHasFirst = true;
                            iFirst = i;
                            iLast = i;
                            continue;
                        }
                        bHasLast = true;

                        vec2_LineStart = cVector_2d.MakeVector(this.aptDefinitionPoints[iLast].x, this.aptDefinitionPoints[iLast].y);
                        //trace("vec2_LineStart: " + vec2_LineStart.toString() );
                        vec2_LineEnd = cVector_2d.MakeVector(this.aptDefinitionPoints[i].x, this.aptDefinitionPoints[i].y);
                        //trace("vec2_LineEnd: " + vec2_LineEnd.toString() );
                        vec2_Point = cVector_2d.MakeVector(cptPointToAdd.x, cptPointToAdd.y);
                        //trace("vec2_Point: " + vec2_Point.toString() );
                        nDistance = cVector_2d.DistanceOfPointToLine(vec2_Point, vec2_LineStart, vec2_LineEnd);

                        vec2_VecLine = cVector_2d.VectorSubtract(vec2_LineStart, vec2_LineEnd);

                        if (nDistance < nOldDistance)
                        {
                            cptIntersectionPoint = cVector_2d.GetPointVerticalIntersection(this.aptDefinitionPoints[i], vec2_VecLine, cptPointToAdd);
                            if (cptIntersectionPoint.bHasInterSection)
                            {
                                //trace("Has intersection");
                                if (cVector_2d.isPointOnLine(this.aptDefinitionPoints[i], this.aptDefinitionPoints[iLast], cptIntersectionPoint))
                                {
                                    //trace("is on line");
                                    nOldDistance = nDistance;
                                    iOldIndex = i;
                                }
                                // else
                                //      trace("is not on line.");
                            }
                            // else
                            //      trace("has no intersection");
                        }

                        // trace("Length: " + aptDefinitionPoints.Length);
                        // trace("Pair["+i+"]: " + aptDefinitionPoints[iLast].toString() + " ; "+aptDefinitionPoints[i].toString() + "Distance: " + nDistance);
                        // trace("Dist: " + nDistance );

                        iLast = i;
                    }// End isvalid
                }// End for


                if (bHasLast)
                {
                    // trace("Has Last...");
                    vec2_LineStart = cVector_2d.MakeVector(this.aptDefinitionPoints[iLast].x, this.aptDefinitionPoints[iLast].y);
                    vec2_LineEnd = cVector_2d.MakeVector(this.aptDefinitionPoints[iFirst].x, this.aptDefinitionPoints[iFirst].y);
                    vec2_Point = cVector_2d.MakeVector(cptPointToAdd.x, cptPointToAdd.y);
                    nDistance = cVector_2d.DistanceOfPointToLine(vec2_Point, vec2_LineStart, vec2_LineEnd);
                    vec2_VecLine = cVector_2d.VectorSubtract(vec2_LineStart, vec2_LineEnd);
                    //trace("Final Pair: " + aptDefinitionPoints[iFirst].toString()+" ; " + aptDefinitionPoints[iLast].toString() + "Distance: " + nDistance);

                    if (nDistance < nOldDistance)
                    {
                        // nOldDistance = nDistance;
                        // iOldIndex = aptDefinitionPoints.Length;
                        cptIntersectionPoint = cVector_2d.GetPointVerticalIntersection(this.aptDefinitionPoints[iLast], vec2_VecLine, cptPointToAdd);
                        if (cptIntersectionPoint.bHasInterSection)
                        {
                            //trace("Is point on this line? "+ aptDefinitionPoints[iLast].toString()+", "+  aptDefinitionPoints[iFirst].toString() );
                            if (cVector_2d.isPointOnLine(this.aptDefinitionPoints[iLast], this.aptDefinitionPoints[iFirst], cptIntersectionPoint))
                            {
                                //trace("isonline");
                                nOldDistance = nDistance;
                                iOldIndex = iLast + 1; //aptDefinitionPoints.Length;
                            }
                            //else
                            //	trace("is not on line.");

                        }
                        //else
                        //	trace("has not");

                    } // End if(nDistance<nOldDistance)

                    //trace("Selected pair: "+iOldIndex);
                    return iOldIndex;
                }// End if(bHasLast)
                else
                {
                    //trace("Selected pair: 1");
                    return 1;
                }
            }
            else
                return 1;

            return (uint)this.aptDefinitionPoints.Length;
        }


        public void AddPoint(cPoint ptPoint, uint iIndex)
        {
            // trace("cPolygon.AddPoint");
            //if(objParentObject != null)
            //	objParentObject.removeChild(shPolygonShape);

            //shPolygonShape = null;
            //shPolygonShape = new cSprite(this);


            //let i:number;
            //for(i=0; i < aspEdgePoints.Length;++i)
            //{
            //	if(aspEdgePoints[i] != null)
            //		objParentObject.removeChild(aspEdgePoints[i]);
            //}


            // this.aptDefinitionPoints.splice(iIndex,0, ptPoint); // insert
            //this.aptDefinitionPoints.push(ptPoint);
            // aspEdgePoints = null;
            // aspEdgePoints = new Array();


            // CreatePolygon(this.objParentObject, this.aptDefinitionPoints, this.iColor);
            //objParentObject.removeChild(e.contextMenuOwner);
            //e.mouseTarget.objRelated.x=100;
            //e.mouseTarget.x=100;
            //e.currentTarget.x=100;
        }



        // instance.CalculateMathematicalArea();
        protected double CalculateMathematicalArea()
        {
            // trace("cPolygon.CalculateMathematicalArea");

            double nArea = 0;

            int i;
            for (i = 0; i < this.aptDefinitionPoints.Length; ++i)
            {
                if (this.aptDefinitionPoints[i] != null)

                {
                    if (!this.aptDefinitionPoints[i].bCurrentlyValid)
                        continue;



                    if (i != this.aptDefinitionPoints.Length - 1)
                    {
                        nArea += this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[i + 1].y - this.aptDefinitionPoints[i + 1].x * this.aptDefinitionPoints[i].y;
                    }
                    else
                    {
                        nArea += this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[0].y - this.aptDefinitionPoints[0].x * this.aptDefinitionPoints[i].y;
                    }

                } // End if(this.aptDefinitionPoints[i] != null)

            } // End for aptDefinitionPoints

            nArea *= 0.5;
            return nArea;
        } // End function cPolygon.CalculateMathematicalArea


        // instance.CalculateArea();
        public double CalculateArea()
        {
            // trace("cPolygon.CalculateArea");
            double nArea = System.Math.Abs(this.CalculateMathematicalArea());
            // trace("Physical area: " + nArea);
            return nArea;
        } // End function cPolygon.CalculateArea


        //let ptCentroid:Point = cpPolygon.CalculateCentroid();
        public Point CalculateCentroid()
        {
            // trace("cPolygon.CalculateCentroid");

            double nCentroidX = 0;
            double nCentroidY = 0;

            uint iFirst = 0;
            bool bFirst = true;
            uint i;
            for (i = 0; i < this.aptDefinitionPoints.Length; ++i)
            {
                if (this.aptDefinitionPoints[i] != null)

                {
                    if (!this.aptDefinitionPoints[i].bCurrentlyValid)
                        continue;

                    if (bFirst)
                    {
                        bFirst = false;
                        iFirst = i;
                    }


                    if (i != this.aptDefinitionPoints.Length - 1)
                    {
                        nCentroidX += (this.aptDefinitionPoints[i].x + this.aptDefinitionPoints[i + 1].x) * (this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[i + 1].y - this.aptDefinitionPoints[i + 1].x * this.aptDefinitionPoints[i].y);
                        nCentroidY += (this.aptDefinitionPoints[i].y + this.aptDefinitionPoints[i + 1].y) * (this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[i + 1].y - this.aptDefinitionPoints[i + 1].x * this.aptDefinitionPoints[i].y);
                    }
                    else
                    {
                        nCentroidX += (this.aptDefinitionPoints[i].x + this.aptDefinitionPoints[iFirst].x) * (this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[iFirst].y - this.aptDefinitionPoints[iFirst].x * this.aptDefinitionPoints[i].y);
                        nCentroidY += (this.aptDefinitionPoints[i].y + this.aptDefinitionPoints[iFirst].y) * (this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[iFirst].y - this.aptDefinitionPoints[iFirst].x * this.aptDefinitionPoints[i].y);
                    }

                } // End if(this.aptDefinitionPoints[i] != null)


            } // End for aptDefinitionPoints

            double nArea = this.CalculateMathematicalArea();

            nCentroidX *= 1 / (6 * nArea);
            nCentroidY *= 1 / (6 * nArea);
            Point ptCentroid = new Point(nCentroidX, nCentroidY);
            //trace("Centroid (x,y): " + ptCentroid.toString() );
            return ptCentroid;
        } // End function cPolygon.CalculateCentroidX


        //let ptMidPoint:Point = cpPolygon.CalculateMidPoint();
        public Point CalculateMidPoint()
        {
            // trace("cPolygon.CalculateMidPoint");

            double nX = 0;
            double nY = 0;

            uint j = 0;
            uint i;
            for (i = 0; i < this.aptDefinitionPoints.Length; ++i)
            {
                if (this.aptDefinitionPoints[i] != null)

                {
                    if (!this.aptDefinitionPoints[i].bCurrentlyValid)
                        continue;

                    nX += this.aptDefinitionPoints[i].x;
                    nY += this.aptDefinitionPoints[i].y;
                    j += 1;
                } // End if(this.aptDefinitionPoints[i] != null)
            } // End for aptDefinitionPoints

            nX /= j;
            nY /= j;
            Point ptReturnValue = new Point(nX, nY);
            return ptReturnValue;
        } // End function cPolygon.CalculateMidPoint()


        // instance.ContainsPoint(x,y);
        public bool ContainsPoint(Point ptPointInQuestion)
        {
            return this.ContainsXY(ptPointInQuestion.x, ptPointInQuestion.y);

        }


        // instance.ContainsXY(x,y);
        public bool ContainsXY(double xc, double yc)
        {
            return false;
        }


    } // End cDrawTools 

} // End Package

// http://de.wikipedia.org/wiki/Schwerpunkt
// https://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/Array.html#splice()
