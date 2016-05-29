<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<title> test xml </title>
<head>
<script>
//alert ("Hello!");

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

<h1> my notes   </h1>

<table border="1" width="85%">
<tr>
<td>

<!-- creating a layer for the tag of each section of notes -->

<xsl:for-each select="notes/section">
<p>
<xsl:number/><b>[<xsl:value-of select="name(.)"/>]
<a href='javascript:processnode("section_{position()}")'><xsl:value-of select="@title"/></a></b>
</p>

<!-- the layer section of notes - section_ + number  -->
<div style='display: visible; background-color: lightgrey;' id='section_{position()}'>

<!-- creating a layer for each tag note -->
<xsl:for-each select="note">

<!-- formation of the layer name and description of poryad.nomera notes -->
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

</td>
</tr>
</table>

</body>
</html>
</xsl:template>

</xsl:stylesheet>


