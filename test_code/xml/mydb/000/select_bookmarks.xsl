<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<head>
<meta charset="utf-8"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
</head>
<style>
a
{
	text-decoration:none;
	font-size:12pt;
	/*color:orange;*/
}
span a
{
	color:#ffffff;
	text-decoration:none;
	font-size:11pt;
}
a:focus, a:hover {
  color: #337ab7;
  text-decoration: none;
}
a:visited {
  color: darkblue;
  text-decoration: none;
}

p
{
	text-align:right;
	margin-top:0;
	margin-right: 15px;
	padding-bottom:10px;
}
span
{
	background:#2C3F66;
	border: 3px outset #000000;
	display: block;
	float: left;
	/*height: 65px;
	width: 120px;*/
	margin:1px;
	padding:10px;
	text-align:center;
	word-wrap: break-word;
	border-radius:10px;
	-moz-border-radius:10px;
	-webkit-border-radius:10px;
}

div.section
{
	/*background:#5A2000;*/
	background:#cccccc;
	/*border:7px outset #FFAC19;*/
	/*border: 7px double black;*/
	/*color:#ffffff;*/
	position: absolute;
	/*width:700px;*/
	overflow-x:hidden;
	top: 15%;
	left: 20px;
	padding-top:2px;
	padding-bottom: 10px;
    padding-left: 20px;
    margin-right: 15px;
}
#left
{
	/*width:85%;*/
}
</style>
<script>
//alert ("Hello!");

function processnode(nnodeid)
{
//alert (nnodeid);

// спрятать все элементы div, кроме 0,1, 3
for (n1=3; n1 &lt; document.getElementsByTagName('DIV').length; n1++)
{
   var divs = document.getElementsByTagName('DIV')[n1];
   divs.style.display="none";
}

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
<!--
<style>
body, html 
	{
	margin-left:1mm;
	margin-top:1mm; 
	padding:0px;
	}

#left
	{
	background:#9c9;
	padding:5px;
	float:left;
	width:250px;
	}

</style>
-->
<body>
<!-- вывести секции закладок  -->
<div id="left" class="container">
	<div class="page-header">
		<h1>Bookmarks...</h1>
	</div>
	<div class="row">
<xsl:for-each select="document('mydb.xml')/main/bookmarks/section">
<!--
<b><xsl:number/>. </b><h3><xsl:value-of select="@title"/></h3> 
-->
		<span>
		<a href='javascript:processnode("section_{position()}")'><xsl:value-of select="@title"/></a><br/>
		</span>
		<div style='display:none' class="section container" id="section_{position()}">
		<p><a href="#" onClick="javascript:document.getElementById('section_{position()}').style.display = 'none'"> x</a></p>
<!--		
		<div style='display: none;  position: absolute; top:1mm; left:220px; background-color: white; border-style:solid; border-color: white;  padding:4mm;' id='section_{position()}'>
-->
		<xsl:for-each select="child::*">
			<xsl:if test="name(.)='a'"><a href="{./@href}" target="_blank"><xsl:value-of select="."/></a><br/></xsl:if>
			<xsl:if test="name(.)='comment'"><b><xsl:value-of select="." /></b><br/></xsl:if>
			<xsl:if test="name(.)='p'"><pre><xsl:value-of select="." /></pre></xsl:if>
			<xsl:if test="name(.)='pre'"><pre><xsl:value-of select="." /></pre></xsl:if>
			<xsl:if test="name(.)='h1'"><h1><xsl:value-of select="." /></h1></xsl:if>
			<xsl:if test="name(.)='h2'"><h2><xsl:value-of select="." /></h2></xsl:if>
			<xsl:if test="name(.)='h3'"><h3><xsl:value-of select="." /></h3></xsl:if>
			<xsl:if test="name(.)='h4'"><h4><xsl:value-of select="." /></h4></xsl:if>
			<xsl:if test="name(.)='hr'">	<hr/>  </xsl:if>

		</xsl:for-each>
		</div>

</xsl:for-each>
	</div><!-- end row -->
</div><!-- end container -->

</body>
</html>

</xsl:template>
</xsl:stylesheet>

