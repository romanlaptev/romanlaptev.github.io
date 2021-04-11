<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<meta charset="utf-8"/>
<title> my notes </title>
<head>
<script>
function processnode(nnodeid)
{
//alert (nnodeid);

// спрятать все элементы div, кроме 0
for (n1=1; n1 &lt; document.getElementsByTagName('DIV').length; n1++)
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
<style>
body, html 
	{
	margin-left:1mm;
	margin-top:1mm; 
	padding:0px;
	}

#left
	{
	background:#99c;
	padding:5px;
	float:left;
	width:200px;
	}
</style>
</head>
<body>

<div id="left">
<!-- creating a layer for the tag of each section of notes -->
<xsl:for-each select="notes/section">
<a href='javascript:processnode("section_{position()}")'><xsl:value-of select="@title"/></a><br/>

<!-- the layer section of notes - section_ + number  -->
<div style='display: none;  position: absolute; top:1mm; left:220px; background-color: white; border-style:solid; border-color: white;  padding:4mm;' id='section_{position()}'>
	<xsl:for-each select="note/child::*">
		<h3><xsl:value-of select="../@title"/></h3>
		<xsl:if test="name(.)='a'"><a href="{./@href}" target="{./@target}"><xsl:value-of select="."/></a><br/></xsl:if>
		<xsl:if test="name(.)='text'"><pre><xsl:value-of select="." /></pre></xsl:if>
		<xsl:if test="name(.)='p'"><pre><xsl:value-of select="." /></pre></xsl:if>
		<xsl:if test="name(.)='h1'"><h1><xsl:value-of select="." /></h1></xsl:if>
		<xsl:if test="name(.)='h2'"><h2><xsl:value-of select="." /></h2></xsl:if>
		<xsl:if test="name(.)='h3'"><h3><xsl:value-of select="." /></h3></xsl:if>
		<xsl:if test="name(.)='h4'"><h4><xsl:value-of select="." /></h4></xsl:if>
		<xsl:if test="name(.)='hr'">	<hr/>  </xsl:if>
		<xsl:if test="name(.)='pre'"><pre><xsl:value-of select="." /></pre></xsl:if>

	</xsl:for-each>
</div>
</xsl:for-each>
</div>

<!--
<xsl:for-each select="note">
  <xsl:variable name="n1" select="concat('note_',../@title,position())"/>

  <a href='javascript:processnode("{$n1}")'><xsl:number/>.[<xsl:value-of select="name(.)"/>]<xsl:value-of select="@title"/></a><br/>
  <div style='display: visible; background-color: white; border-style:double; border-color:black;  padding:4mm;' id='{$n1}'>

           <xsl:for-each select="a">
           <li><a href="{@href}"><xsl:value-of select="."/></a></li>
           </xsl:for-each>

           <xsl:for-each select="p">
           <pre><xsl:value-of select="."/></pre>
           </xsl:for-each>
 
 </div>
</xsl:for-each>

</div>
</xsl:for-each>
-->

</body>
</html>
</xsl:template>

</xsl:stylesheet>



