import React,{useContext} from 'react';
import { Text, View,StyleSheet, Pressable, Alert } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import theme from '../../../assets/theme';
import { gestureHandlerRootHOC,Swipeable,RectButton,TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

FontAwesome.loadFont();

let rowRefs = new Map();

const Decks=gestureHandlerRootHOC(({navigation,decks,handleDeleteDeck})=> {
    //NightMode Colors!
    const {mode} = useContext(ThemeContext);

    const renderSwipeDelete=(progress, dragX)=>{
        return(
            <RectButton style={styles.deleteItemWrapper}>
                <FontAwesome name='trash' color={'white'} size={20} />
            </RectButton>
        );
    }

    return ( 
        <View style={styles.container}>
            {decks.map((item,index)=>(
                <Swipeable 
                    key={index} 
                    ref={ref => {
                        if (ref && !rowRefs.get(item.id)) {
                          rowRefs.set(item.id, ref);
                        }
                    }}
                    renderRightActions={renderSwipeDelete} 
                    onSwipeableOpen={()=>{
                        [...rowRefs.entries()].forEach(([id, ref]) => {
                            ref.close();
                        });
                        handleDeleteDeck(item.id);
                    }}>

                    <TouchableOpacity 
                        style={[styles.deckWrapper,{backgroundColor:theme.colors[mode].background,borderBottomColor:theme.colors[mode].t3}]} 
                        onPress={()=>navigation.navigate('Cards',{id:item.id,item:item})}
                        activeOpacity={0.6}>
                        <Text style={[styles.deckTitle,{color:theme.colors[mode].t1}]}>{item.title}</Text>
                        <View style={styles.deckSide}>
                            <Text style={styles.deckCount}>{item.easy}</Text>
                            <Text style={styles.deckCount}>{item.again}</Text>
                            <Text style={styles.deckCount}>{item.good}</Text>
                        </View>
                    </TouchableOpacity>
                </Swipeable>
            ))}
        </View>
     );
});

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    deckWrapper:{
        flexDirection:'row',
        borderBottomWidth:1,
        backgroundColor:theme.colors.white,
        // borderBottomColor:theme.colors.lightGray,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
    },
    deckTitle:{
        ...theme.typo.h2,
        color:theme.colors.black,
    },
    deckSide:{
        flexDirection:'row',
    },
    deckCount:{
        ...theme.typo.b2,
        color:theme.colors.midGray,
        marginLeft:2,
    },
    deleteItemWrapper:{
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:10,
        width:'100%',
    },
    deleteItemText:{
        
    },
});

export default Decks;