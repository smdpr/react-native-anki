import React, { useContext } from 'react';
import { Text,View,StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import { AddNoteContext } from '../../context/AddNoteContext';
import theme from '../../../assets/theme';

Entypo.loadFont();
MaterialCommunityIcons.loadFont();
FontAwesome.loadFont();

const  DropDown = ({label,list,setDropDown}) => {
    return ( 
        <View style={styles.dropDownGroup}>
            <Text style={styles.labelTitle}>{label} </Text>
            <SelectDropdown
                data={list}
                // defaultValue={decks.length>0?decks[0].title:null}
                onSelect={(selectedItem) => {
                    setDropDown(selectedItem.id)
                    // console.log(selectedItem.id)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.title
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.title
                }}
                buttonStyle={styles.dropDownWrapper}
                buttonTextStyle={styles.dropDownText}
                renderDropdownIcon={()=>(
                    <View style={{position:'absolute',right:0,}}>
                        <Entypo name="chevron-small-down" size={25} color={'black'} />
                    </View>
                )}
                rowTextStyle={{position:'absolute',left:0,paddingVertical:15,}}
            />
        </View>
    );
}

const  TextBox= ({label,defaultValue,setTextBoxInput,setTextBoxSelection}) => {
    return ( 
        <View style={styles.textBoxGroup}>
            <View style={styles.textBoxLabel}>
                <Text style={styles.labelTitle}>{label}</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="attachment" size={20} color={'black'} />
                </TouchableOpacity>
            </View>
            <TextInput style={styles.textBox} multiline value={defaultValue} onChangeText={setTextBoxInput} onSelectionChange={({ nativeEvent: { selection }}) => setTextBoxSelection(selection)} />
        </View>
    );
}

const TagsCards = () => {
    //This item is unavailable in this version! 
    return ( 
        <View style={{marginTop:15,marginBottom:100}}>
            <View style={styles.extraBoxWrapper}>
                <Text style={styles.extraBoxTitle}>Tags:</Text>
            </View>

            <View style={styles.extraBoxWrapper}>
                <Text style={styles.extraBoxTitle}>Cards:  Card1</Text>
            </View>
        </View>
     );
}

const TextEditorButton=({name})=>{
    return(
        <TouchableOpacity style={styles.textEditorButton}>
            <FontAwesome name={name} size={20} color={'black'} />
        </TouchableOpacity>
    );
}

const TextEditor=()=>{
    return(
        <View style={styles.textEditorWrapper}>
            <TextEditorButton name={'bold'} />
            <TextEditorButton name={'italic'} />
            <TextEditorButton name={'underline'} />
            <TextEditorButton name={'text-width'} />
            <TextEditorButton name={'align-left'} />
            <TextEditorButton name={'align-center'} />
            <TextEditorButton name={'align-right'} />
        </View>
    );
}

const AddNoteLayout = () => {
    const {decks,setDeckInput,frontInput,backInput,setFrontInput,setBackInput,setFrontInputSelection,setBackInputSelection}=useContext(AddNoteContext);

    return ( 
        <View style={styles.container}>
            <ScrollView style={{padding:15}}>
                <DropDown label='Type: ' list={[]} setDropDown={()=>{}}  />
                <DropDown label='Decks: ' list={decks} setDropDown={setDeckInput}  />
                <TextBox label={'Front: '} defaultValue={frontInput} setTextBoxInput={setFrontInput} setTextBoxSelection={setFrontInputSelection}  />
                <TextBox label={'Back: '} defaultValue={backInput} setTextBoxInput={setBackInput} setTextBoxSelection={setBackInputSelection}  />
                <TagsCards />
            </ScrollView>
            <TextEditor />
        </View>
    );
}
 
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
    },
    dropDownGroup:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
    },
    labelTitle:{
        ...theme.typo.h2,
        color:theme.colors.black
    },
    dropDownWrapper:{
        flex:1,
        marginLeft:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:theme.colors.white,
    },
    dropDownText:{
        fontFamily:'OpenSans-Regular',
        fontSize:18,
        color:theme.colors.black,
        position:'absolute',
    },
    textBoxGroup:{
        marginTop:15,
    },
    textBoxLabel:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textBox:{
        color:'black',
        borderBottomColor:theme.colors.black,
        borderBottomWidth:1,
        fontSize:18,
        maxWidth:1000,
    },
    extraBoxWrapper:{
        marginTop:10,
        backgroundColor:theme.colors.midGray,
        paddingVertical:6,
        paddingHorizontal:10,
        borderRadius:5,
    },
    extraBoxTitle:{
        ...theme.typo.b2,
        fontSize:16,
        color:theme.colors.black
    },
    textEditorWrapper:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:theme.colors.midGray,
        height:45,
        width:'100%',
    },
    textEditorButton:{
        
    },
});

export default AddNoteLayout;