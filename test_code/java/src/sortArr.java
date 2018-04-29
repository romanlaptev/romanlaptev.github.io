/**
 * Created by dev_user on 29.04.18.
 * Sort array
 */
import java.util.Arrays;

public class sortArr {
    public static void main ( String args[]){

        int size = 100000;
        System.out.println("Sort array " + size + " random elements");

        System.out.println("===");
        System.out.println("Sorting, method 1");

        int  m[] = new int[ size ];
        //fill array random numbers
        for( int n = 0; n < m.length; n++){
            m[n] = (int) ( Math.random() * 100 );
        }
//System.out.println( "Unsort array:" + Arrays.toString(m));

        int num = 0;
        int tmp = 0;
        int numOfGoodPairs = 0;

        long timeStart = System.currentTimeMillis();

        while( true ){
            if( m[num] > m[num + 1] ){
                tmp = m[num];
                m[num] = m[num + 1];
                m[num + 1] = tmp;
                numOfGoodPairs = 0;
            } else {
                numOfGoodPairs++;
            }

            if( numOfGoodPairs == m.length - 1 ){
              break;
            }

            num++;
            if( num == m.length - 1 ){
                num = 0;
            }

        }//next

        long timeEnd = System.currentTimeMillis();
        long runTime = timeEnd - timeStart;

 //System.out.println( "Sort array:" + Arrays.toString(m));
        System.out.println( "Runtime:" + runTime + " ms");

//----------------------------- sorting 2
        System.out.println("===");
        System.out.println("Sorting, method 2");

        //fill array random numbers
        for( int n = 0; n < m.length; n++){
            m[n] = (int) ( Math.random() * 100 );
        }
//System.out.println( "Unsort array:" + Arrays.toString(m));

        timeStart = System.currentTimeMillis();
        tmp = 0;
        for(int n2 = 0; n2 < m.length; n2++){
            for( int n = 0; n < (m.length - 1); n++){
                if( m[n] > m[n + 1] ){
                    tmp = m[n];
                    m[n] = m[n + 1];
                    m[n + 1] = tmp;
                }
            }//next
        }//next

        timeEnd = System.currentTimeMillis();
        runTime = timeEnd - timeStart;
//System.out.println( "Sort array:" + Arrays.toString(m));
        System.out.println( "Runtime:" + runTime + " ms");

//----------------------------- system sorting
        System.out.println("===");
        System.out.println("Sorting, system method Arrays.sort()");
        //fill array random numbers
        for( int n = 0; n < m.length; n++){
            m[n] = (int) ( Math.random() * 100 );
        }
//System.out.println( "Unsort array:" + Arrays.toString(m));

        timeStart = System.currentTimeMillis();
        Arrays.sort(m);

        timeEnd = System.currentTimeMillis();
        runTime = timeEnd - timeStart;

//System.out.println( "Sort array:" + Arrays.toString(m));
        System.out.println( "Runtime:" + runTime + " ms");

    }//end main()
}//end class
