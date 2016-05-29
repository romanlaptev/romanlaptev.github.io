<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<title> test xml </title>
<head>
<script>
//alert ("Hello!");
//-----------------------------------------------------------
// слои
//-----------------------------------------------------------

  function processnode(nnodeid)
   {

//alert (document.getElementById("div_" + nnodeid));

    if (document.getElementById("div_" + nnodeid).style.display == "none")
      {
      document.getElementById("div_" + nnodeid).style.display = ""
      }
    else
      {
      document.getElementById("div_" + nnodeid).style.display = "none"
      }
   }

</script>
</head>
<body>

<h1> dictionary   </h1>
<table border="1" align="center" bgcolor="#CECDD6" width="96%" cellpadding="10" cellspacing="1">
	<xsl:apply-templates/> 
</table>

<table border="1">
    <tr bgcolor="#9acd32">
      <th align="left">name_article</th>
      <th align="left">text_article</th>
    </tr>
    <xsl:for-each select="dictionary/article">
    <tr>
      <td><xsl:value-of select="name_article" /></td>
      <td><xsl:value-of select="text_article" /></td>
    </tr>
    </xsl:for-each>
</table>

</body>
</html>
</xsl:template>

<xsl:template match="article">
<tr>
<td align="justify">

№<xsl:number/>.

<xsl:variable name="title" select="@title"/>
<p>title <xsl:value-of select="$title"/> </p>

<xsl:variable name="num" select="position()"/>
<p>position <xsl:value-of select="$num"/> </p>

<xsl:variable name="node_name" select="name(.)"/>
<p>node_name <xsl:value-of select="$node_name"/> </p>

<a href='javascript:processnode({$num})'><xsl:apply-templates select="name_article"/></a>

<div style='display: none; background-color: white; border-style:double; border-color:black;  padding:4mm;' id='div_{$num}'>
<xsl:value-of select="@title"/>
<p>
<xsl:apply-templates select="text_article"/>
</p>
</div>
</td>
 </tr>
</xsl:template>

</xsl:stylesheet>
