<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<meta charset="utf-8"/>
<title> my books </title>
<head>
<style>
body 
{
  background-color: #004000;
  color: #FFFFFF;
}

a:link	
{
	color: orange; 
}

a:visited 
{
	color: orange; 
}

a:hover	
{
	color: gold; 
}

/*
a
{
	font-family: Verdana, Arial, Helvetica, sans-serif;
	text-decoration: none;
}
*/



#list
{
	float:left;
    /*border: 1px solid red;*/
    margin-left: 6%;
   /*width: 80%;*/
}

#list ul
{
    margin: auto;
}

#list li
{
    list-style: none;
    float: left;
    margin: 10px;
}

.name
{
	/*border:1px solid green;*/
	width:100%;
	height:55%;
}

.name a
{
	color: blue; 
	width:100%;
	height:100%;
	display:block;
	padding-top:15px;
}

.author
{
	color:#000000;
}

.book
{
	float:left;
	background: palegreen;
	border:8px double green;
    height: 180px;
    margin: 10px;
    padding: 10px;
    text-align: center;
    width: 150px;
}
span
{
	color:maroon;
	font-size:14px;
}

p
{
	text-align:right;
	margin-top:0;
	margin-bottom:0;
	margin-right: 15px;
	/*padding-bottom:10px;*/
}
/*
#div_main
{
	position:absolute;
	left:10px;
	top:50px;
	float:left;
    background: none repeat scroll 0 0 #116111;
    border: 7px double #FFAC19;
	clear:both;
}
*/

#div_main,
.section_author
{
    float: left;
    position: absolute;
    top: 50px;
    left: 50px;
    width: 85%;
    /*margin: 30px;*/
    padding-left: 10px;
    padding-bottom: 10px;
    border: 3px solid paleGreen;
    /*background: none repeat scroll 0 0 #590000;*/
}

</style>
<script>
function processnode(nnodeid)
{
//alert (nnodeid);
 if (document.getElementById(nnodeid).style.display == "none")
   {
    document.getElementById(nnodeid).style.display = ""
   }
 else
   {
    document.getElementById(nnodeid).style.display = "none"
   }
}
</script>
</head>
<body>

<div id="list">
<ul>
<li><a href="javascript:processnode('div_main');"> все авторы </a></li>
<li><a href="javascript:processnode('div_A');"> А </a></li>
<li><a href="javascript:processnode('div_B');"> Б </a></li>
<li><a href="javascript:processnode('div_V');"> В </a></li>

<li><a href="javascript:processnode('div_G');"> Г  </a></li>
<li><a href="javascript:processnode('div_D');"> Д  </a></li>
<li><a href="javascript:processnode('div_E');"> Е  </a></li>
<!--
<li><a href="javascript:processnode('div_Ё');"> Ё  </a></li>
-->
<li><a href="javascript:processnode('div_ZH');"> Ж  </a></li>

<li><a href="javascript:processnode('div_Z');"> З  </a></li>
<li><a href="javascript:processnode('div_I');"> И  </a></li>
<!--
<li><a href="javascript:processnode('div_Й');"> Й  </a></li>
-->
<li><a href="javascript:processnode('div_K');"> К  </a></li>
<li><a href="javascript:processnode('div_L');"> Л  </a></li>

<li><a href="javascript:processnode('div_M');"> М  </a></li>
<li><a href="javascript:processnode('div_N');"> Н  </a></li>
<li><a href="javascript:processnode('div_O');"> О  </a></li>
<li><a href="javascript:processnode('div_P');"> П  </a></li>
<li><a href="javascript:processnode('div_R');"> Р  </a></li>

<li><a href="javascript:processnode('div_S');"> С  </a></li>
<li><a href="javascript:processnode('div_T');"> Т  </a></li>
<li><a href="javascript:processnode('div_U');"> У  </a></li>
<li><a href="javascript:processnode('div_F');"> Ф  </a></li>
<li><a href="javascript:processnode('div_H');"> Х  </a></li>

<li><a href="javascript:processnode('div_C');"> Ц  </a></li>
<li><a href="javascript:processnode('div_CH');"> Ч  </a></li>
<li><a href="javascript:processnode('div_SH');"> Ш  </a></li>
<li><a href="javascript:processnode('div_SCH');"> Щ  </a></li>
<!--
<li><a href="javascript:processnode('div_Ъ');"> Ъ  </a></li>
<li><a href="javascript:processnode('div_Ы');"> Ы  </a></li>
<li><a href="javascript:processnode('div_Ь');"> Ь  </a></li>
-->

<li><a href="javascript:processnode('div_EU');"> Э  </a></li>
<li><a href="javascript:processnode('div_YU');"> Ю  </a></li>
<li><a href="javascript:processnode('div_YA');"> Я  </a></li>
<!--	<xsl:if test="./genre='детектив'">
<li><a href="javascript:processnode('div_classics_prose;">classics_prose </a></li>
<li><a href="javascript:processnode('div_adventures;">adventures </a></li>
<li><a href="javascript:processnode('div_detective,criminal;">detective,criminal</a></li>
<li><a href="javascript:processnode('div_docs;">docs</a></li>
<li><a href="javascript:processnode('div_document, articles;">document, articles</a></li>
<li><a href="javascript:processnode('div_eat;">eat</a></li>
<li><a href="javascript:processnode('div_fantasy;">fantasy</a></li>
<li><a href="javascript:processnode('div_science_fiction;">science_fiction </a></li>
<li><a href="javascript:processnode('div_history;">history </a></li>
<li><a href="javascript:processnode('div_history_novel;">history_novel </a></li>
<li><a href="javascript:processnode('div_humor;">humor </a></li>
<li><a href="javascript:processnode('div_medicine;">medicine </a></li>
<li><a href="javascript:processnode('div_prose;">prose </a></li>
<li><a href="javascript:processnode('div_classics_prose;">classics_prose </a></li>
<li><a href="javascript:processnode('div_thriller_prose;">thriller_prose </a></li>
<li><a href="javascript:processnode('div_war_prose;">war_prose </a></li>
<li><a href="javascript:processnode('div_psychology;">psychology </a></li>
<li><a href="javascript:processnode('div_slovar;">slovar </a></li>
-->
</ul>
</div>

  <xsl:variable name="url" select="'http://rlaptev.co.cc/ext/'"/>
<!--  <xsl:variable name="url" select="'http://roman-laptev.narod.ru/'"/>-->

<!-- ================================================================= -->
<div id="div_main">
<p><a href="#" onClick="javascript:document.getElementById('div_main').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
<!--	<xsl:if test="@author='Акунин Борис'">-->
<!--	<xsl:if test="./genre='детектив'">-->
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
			<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
<!--	</xsl:if>-->
<!--	</xsl:if>-->
</xsl:for-each>
</div>
<!-- ================================================================= -->
<div id="div_A"  class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_A').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='A'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->
<div id="div_B" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_B').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='B'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->
<div id="div_V" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_V').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='V'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_G" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_G').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='G'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_D" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_D').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='D'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_E" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_E').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='E'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_ZH" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_ZH').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='ZH'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_Z" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_Z').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='Z'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_I" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_I').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='I'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_K" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_K').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='K'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_L" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_L').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='L'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_M" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_M').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='M'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_N" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_N').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='N'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_O" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_O').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='O'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_P" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_P').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='P'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_R" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_R').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='R'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_S" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_S').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='S'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_T" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_T').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='T'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_U" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_U').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='U'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_F" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_F').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='F'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_H" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_H').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='H'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_C" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_C').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='C'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_CH" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_CH').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='CH'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_SH" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_SH').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='SH'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_SCH" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_SCH').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='SCH'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_EU" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_EU').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='EU'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_YU" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_YU').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='YU'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->

<div id="div_YA" class="section_author" style="display:none;">
<p><a href="#" onClick="javascript:document.getElementById('div_YA').style.display = 'none'"> x</a></p>
<xsl:for-each select="document('mydb.xml')/main/books/book">
	<xsl:if test="@keyword='YA'">
		<div class="book">		
			<span><xsl:number/></span>
			<div class="author"><xsl:value-of select="@author"/></div>

			<div class="name">
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{$url}{./@href}" target="_blank"><xsl:value-of select="."/></a></xsl:if>
				</xsl:for-each>
			</div>

			<div>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='genre'"><span><xsl:value-of select="." /></span></xsl:if>
				</xsl:for-each>
			</div>
		</div>
	</xsl:if>
</xsl:for-each>
</div>
<!-- ================================================================= -->
</body>
</html>


</xsl:template>
</xsl:stylesheet>

